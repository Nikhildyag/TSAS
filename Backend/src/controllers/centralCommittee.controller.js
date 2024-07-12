import { Central } from "../models/centralMember.model.js";

const createcentralMember = async (req, res) => {
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
    const existedDepartmentMember = await Central.findOne({ username });
    if (existedDepartmentMember)
      return res.status(400).json({ message: "you are already registered" });

    //creating the new admin
    const newDepartmentMember = await Central.create({
      fullName,
      username,
      password,
      department,
      committee_name,
      role,
    });

    // console.log(newDepartmentMember);
    //checking if the new Admin is created or not
    const createdDepartmentMember = await Central.findById(
      newDepartmentMember._id
    ).select("-password");
    if (!createdDepartmentMember) {
      return res.status(500).json({
        message: "Something went wrong while creating the central member",
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

// const committees = [
//   "academic",
//   "amenities",
//   "greening",
//   "career",
//   "cultural",
//   "oppurtunities",
//   "environment",
//   "external",
//   "grievance",
//   "health",
//   "hostel",
//   "mess",
//   "photography",
//   "placement",
//   "safety",
//   "social",
//   "sports",
//   "innovation",
//   "excellence",
// ]; // List of departments

// const usersData = committees.flatMap((committee) =>
//   Array.from({ length: 7 }, (_, index) => ({
//     username: `central${committee}${index + 1}`,
//     password: "rgukt123",
//     committee_name: committee,
//   }))
// );

// const createBulk = async (req, res) => {
//   try {
//     for (let userData of usersData) {
//       // Assuming User.create() is a method to create users in your model
//       await Central.create(userData);
//       console.log(`Created user: ${userData.username}`);
//     }
//     console.log("Bulk user creation completed.");
//     return res.status(200).json({ message: "completed" });
//   } catch (error) {
//     console.error("Error creating users:", error);
//   }
// };

const loginCentralMember = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "All fields are required" });
  const centralMember = await Central.findOne({ username });
  if (!centralMember)
    return res.status(400).json({ message: "you are not authorized" });
  const isPasswordValid = await centralMember.isPasswordCorrect(password);
  if (!isPasswordValid)
    return res.status(400).json({ message: "your password is not valid" });
  const accessToken = await centralMember.generateAccessToken();
  const options = {
    httpOnly: true,
    secure: true, // Ensure this is true if using HTTPS
    sameSite: "None",
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({ member: centralMember, accessToken });
};

const updateCentralMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { fullName, Id_number, department } = req.body;
    if (!fullName && !Id_number && !department) {
      return res
        .status(400)
        .json({ message: "atleast one change is required" });
    }
    let centralMember = await Central.findById(memberId);
    if (fullName) centralMember.fullName = fullName;
    if (Id_number) centralMember.Id_number = Id_number;
    if (department) centralMember.department = department;
    await centralMember.save();
    return res
      .status(200)
      .json({ message: "updated successfully", member: centralMember });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { createcentralMember, loginCentralMember, updateCentralMember };