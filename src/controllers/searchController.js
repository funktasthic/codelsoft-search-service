const User = require('../models/user.model');
const Role = require('../models/role.model');
const Grade = require('../models/grade.model');
const Restriction = require('../models/restriction.model');

const getStudentGradesAndRestrictions = async (req = request, res = response) => {
  try {
    const { search } = req.query;

    // Get user requested by query by id
    const user = await User.findById(req.user.id);

    // Verify if user is admin or teacher
    const userRole = await Role.findById(user.roleId);
    if (userRole.name !== 'ADMIN' && userRole.name !== 'TEACHER') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    // Get only users with student role
    const studentRole = await Role.findOne({ name: 'STUDENT' });

    const students = await User.find({
      roleId: studentRole._id,
      $or: [
        // Use regex for uuid
        { _id: { $regex: search, $options: 'i' } },
        // Use regex for fullName
        { fullName: { $regex: search, $options: 'i' } },
      ],
    }).select('_id fullName email');

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No students found',
      });
    }

    // Get student grades and restrictions
    const studentData = await Promise.all(
      students.map(async (student) => {
        const [grades, restrictions] = await Promise.all([
          Grade.find({ studentId: student._id }).select('id subjectName gradeName grade comment'),
          Restriction.find({ studentId: student._id }).select('id reason studentId createdAt'),
        ]);

        return {
          student: {
            _id: student._id,
            fullName: student.fullName,
            email: student.email,
            grades,
            restrictions,
          },
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: studentData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStudentGradesAndRestrictions,
};
