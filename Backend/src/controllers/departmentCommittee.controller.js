import { Department } from "../models/departmentCommittee.model.js";

const createDepartmentMember = async (req, res) => {
  try {
    //getting the inputs from the user
    const { username, password, fullName, department, committee_name, role } =
      req.body;

    //checking if all the fields are there or not
    if (!username || !password || !department || !committee_name) {
      return res
        .status(400)
        .json({ message: "All fields which are marked * are must" });
    }
    const existedDepartmentMember = await Department.findOne({ username });
    if (existedDepartmentMember)
      return res.status(400).json({ message: "you are already registered" });

    //creating the new admin
    const newDepartmentMember = await Department.create({
      fullName,
      username,
      password,
      department,
      committee_name,
      role,
    });

    // console.log(newDepartmentMember);
    //checking if the new Admin is created or not
    const createdDepartmentMember = await Department.findById(
      newDepartmentMember._id
    ).select("-password");
    if (!createdDepartmentMember) {
      return res.status(500).json({
        message: "Something went wrong while creating the department member",
      });
    }

    //all are correct
    return res
      .status(200)
      .json({ message: "New Department Member registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

// const departments = ["cse", "ece", "eee", "mech", "civil", "mme", "chem"]; // List of departments

// const usersData = departments.flatMap((department) =>
//   Array.from({ length: 4 }, (_, index) => ({
//     username: `${department}academic${index + 1}`,
//     password: "rgukt123",
//     committee_name: "Academic",
//     department: department,
//   }))
// );

// const createBulk = async (req, res) => {
//   try {
//     for (let userData of usersData) {
//       // Assuming User.create() is a method to create users in your model
//       await Department.create(userData);
//       console.log(`Created user: ${userData.username}`);
//     }
//     console.log("Bulk user creation completed.");
//     return res.status(200).json({ message: "completed" });
//   } catch (error) {
//     console.error("Error creating users:", error);
//   }
// };

const loginDepartmentMember = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "All fields are required" });
  const departmentMember = await Department.findOne({ username });
  if (!departmentMember)
    return res.status(400).json({ message: "you are not authorized" });
  const isPasswordValid = await departmentMember.isPasswordCorrect(password);
  if (!isPasswordValid)
    return res.status(400).json({ message: "your password is not valid" });
  const accessToken = await departmentMember.generateAccessToken();
  const options = {
    httpOnly: true,
    secure: true, // Ensure this is true if using HTTPS
    sameSite: "None",
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({ member: departmentMember, accessToken });
};

const updateDepartmentMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { fullName, Id_number } = req.body;
    if (!fullName && !Id_number) {
      return res
        .status(400)
        .json({ message: "atleast one change is required" });
    }
    let departmentMember = await Department.findById(memberId);
    if (fullName) departmentMember.fullName = fullName;
    if (Id_number) departmentMember.Id_number = Id_number;
    await departmentMember.save();
    return res
      .status(200)
      .json({ message: "updated successfully", member: departmentMember });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export {
  createDepartmentMember,
  loginDepartmentMember,
  updateDepartmentMember,
};