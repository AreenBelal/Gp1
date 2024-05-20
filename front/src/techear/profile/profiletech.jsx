import React, { useState } from "react";

function Profile() {
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);

  const [isEditing, setIsEditing] = useState(true); // حالة للتحقق مما إذا كان بإمكان المستخدم تعديل البيانات أم لا

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevProfileInfo) => ({
      ...prevProfileInfo,
      [name]: value,
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", position: "", duration: "" },
    ]);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
    setEducation([...education, { institution: "", degree: "", duration: "" }]);
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleSave = () => {
    setIsEditing(false); // تعطيل التعديل بمجرد الضغط على زر الحفظ
  };

  return (
    <div className="container mt-5">
      <div className="card bg-light p-4">
        <h3 style={{ marginBottom: "30px" }}>المعلومات الشخصية</h3>
        <div className="form-group">
          <label>الاسم:</label>
          <input
            type="text"
            name="name"
            value={profileInfo.name}
            onChange={handleProfileChange}
            className="form-control"
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>البريد الإلكتروني:</label>
          <input
            type="email"
            name="email"
            value={profileInfo.email}
            onChange={handleProfileChange}
            className="form-control"
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="card bg-light p-4 mt-4">
        <h4>الخبرات العملية</h4>
        {experiences.map((exp, index) => (
          <div key={index} className="row">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="المؤسسة"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                className="form-control"
                disabled={!isEditing}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                placeholder="المنصب"
                value={exp.position}
                onChange={(e) =>
                  handleExperienceChange(index, "position", e.target.value)
                }
                className="form-control"
                disabled={!isEditing}
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleAddExperience}
          className="btn mt-2"
          style={{ backgroundColor: "var(--main-color)", color: "white" }}
          disabled={!isEditing}
        >
          إضافة تجربة عملية
        </button>
      </div>

      <div className="card bg-light p-4 mt-4">
        <h4>التعليم</h4>
        {education.map((edu, index) => (
          <div key={index} className="row">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="المؤسسة التعليمية"
                value={edu.institution}
                onChange={(e) =>
                  handleEducationChange(index, "institution", e.target.value)
                }
                className="form-control"
                disabled={!isEditing}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                placeholder="الدرجة العلمية"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                className="form-control"
                disabled={!isEditing}
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleAddEducation}
          className="btn mt-2"
          style={{ backgroundColor: "var(--main-color)", color: "white" }}
          disabled={!isEditing}
        >
          إضافة تعليم
        </button>
      </div>

      <div className="card bg-light p-4 mt-4">
        <h4>المهارات</h4>
        {skills.map((skill, index) => (
          <div key={index} className="row">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="المهارة"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="form-control"
                disabled={!isEditing}
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleAddSkill}
          className="btn mt-2"
          style={{ backgroundColor: "var(--main-color)", color: "white" }}
          disabled={!isEditing}
        >
          إضافة مهارة
        </button>
      </div>

      {/* زر حفظ */}
      {isEditing && (
        <div className="text-center mt-4">
          <button
            onClick={handleSave}
            className="btn mt-2"
            style={{
              backgroundColor: "var(--main-color)",
              color: "white",
              width: "900px",
            }}
          >
            حفظ
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
