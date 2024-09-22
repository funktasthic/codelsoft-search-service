const User = require('../models/user.model');
const Role = require('../models/role.model');
const Grade = require('../models/grade.model');
const Restriction = require('../models/restriction.model');

const getStudentGradesAndRestrictions = async (req = request, res = response) => {
  try {
    const { search } = req.query;

    // Get the user making the request
    const user = await User.findById(req.user.id);
    const userRole = await Role.findById(user.roleId);

    // Check permissions for ADMIN or TEACHER
    if (userRole.name !== 'ADMIN' && userRole.name !== 'TEACHER') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    // Find the STUDENT role
    const studentRole = await Role.findOne({ name: 'STUDENT' });

    // Find students by ID or full name
    const students = await User.find({
      roleId: studentRole._id,
      $or: [
        { _id: { $regex: `^${search}`, $options: 'i' } },
        { fullName: { $regex: `^${search}`, $options: 'i' } },
      ],
    }).select('_id name lastName fullName email');

    // Verify if any students exists
    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No students found',
      });
    }

    // Get grades and restrictions for each student
    const studentData = await Promise.all(
      students.map(async (student) => {
        const [grades, restrictions] = await Promise.all([
          Grade.find({ studentId: student._id }).select('id subjectName gradeName grade comment'),
          Restriction.find({ studentId: student._id }).select('id reason createdAt'),
        ]);

        return {
          student: {
            _id: student._id,
            fullName: student.fullName,
            name: student.name,
            lastName: student.lastName,
            email: student.email,
            grades,
            restrictions,
          },
        };
      })
    );

    // Return student data
    return res.status(200).json({
      success: true,
      data: studentData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStudentByRestrictionOrReason = async (req = request, res = response) => {
  try {
    const { search } = req.query;

    // Get the user making the request
    const user = await User.findById(req.user.id);
    const userRole = await Role.findById(user.roleId);

    // Check permissions for ADMIN or TEACHER
    if (userRole.name !== 'ADMIN' && userRole.name !== 'TEACHER') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    // Search for restrictions by ID or reason
    const restrictions = await Restriction.find({
      $or: [
        { _id: { $regex: `${search}`, $options: 'i' } },
        { reason: { $regex: `${search}`, $options: 'i' } },
      ],
    }).select('id studentId reason createdAt');

    // Verify if any restrictions exists
    if (restrictions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No restrictions found',
      });
    }

    // Get student ID
    const studentIds = restrictions.map((restriction) => restriction.studentId);

    // Find the STUDENT role
    const studentRole = await Role.findOne({ name: 'STUDENT' });

    // Find students associated with restrictions
    const students = await User.find({
      _id: { $in: studentIds },
      roleId: studentRole._id,
    }).select('_id fullName name lastName email');

    // Combine students with their restrictions
    const studentData = students.map((student) => {
      // Filter restrictions by student ID
      const studentRestrictions = restrictions.filter(
        (restriction) => restriction.studentId === student._id
      );
      return {
        student: {
          _id: student._id,
          fullName: student.fullName,
          name: student.name,
          lastName: student.lastName,
          email: student.email,
          restrictions: studentRestrictions,
        },
      };
    });

    // Return student data
    return res.status(200).json({
      success: true,
      data: studentData,
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
  getStudentByRestrictionOrReason,
};
