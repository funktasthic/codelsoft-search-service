const User = require('../models/user.model');
const Role = require('../models/role.model');
const Grade = require('../models/grade.model');
const Restriction = require('../models/restriction.model');

const getStudentGradesAndRestrictions = async (req = request, res = response) => {
  try {
    const { studentId } = req.params;

    // Verify if user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Verify if user is admin or teacher
    const userRole = await Role.findById(user.roleId);
    if (userRole.name !== 'ADMIN' && userRole.name !== 'TEACHER') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Get student grades and restrictions
    const [grades, restrictions] = await Promise.all([
      Grade.find({ studentId: studentId }).select('id subjectName gradeName grade comment'),
      Restriction.find({ studentId: studentId }).select('id reason studentId createdAt'),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        student: {
          _id: student._id,
          name: student.name,
          lastName: student.lastName,
          email: student.email,
          grades: grades,
          restrictions: restrictions,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStudentGradesAndRestrictions,
};
