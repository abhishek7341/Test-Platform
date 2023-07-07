import { useParams } from "react-router";
import AddEditFormLayout from "../../components/UI/adminAddEditForm/AddEditFormLayout";
import { useEffect, useState } from "react";
import AdminFormTextField from "../../components/UI/adminAddEditForm/AdminFormTextField";
import AdminFormLabel from "../../components/UI/adminAddEditForm/AdminFormLabel";
import Button from "../../components/UI/CustomButton";
import CancelButton from "../../components/UI/CancelButton";
import TextEditor from "../../components/textEditor/TextEditor";
import missionServices from "../../services/mission-services";
import { IMission } from "../../utility/interfaces/mission";
import { format } from "date-fns";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  shortDescription: yup.string().required("Password is required"),
  desc: yup.string().required("Desc is req"),
});

const MissionAddEdit = () => {
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [missionData, setMissionData] = useState<IMission>();
  const { missionId } = useParams();
  useEffect(() => {
    if (missionId) {
      setIsAdd(false);
      missionServices.fetchMissionData(+missionId).then((response) => {
        setMissionData(response.data.data);
      });
    } else {
      setIsAdd(true);
    }
  }, [missionId]);
  useEffect(() => {}, [missionData]);
  const formik = useFormik({
    initialValues: {
      title: missionData ? missionData.title : "",
      shortDescription: missionData ? missionData.shortDescription : "",
      description: missionData ? missionData.description : "",
      organizationName: missionData ? missionData.organizationName : "",
      organizationDetails: missionData ? missionData.organizationDetails : "",
      availability: missionData ? missionData.availability : "",
      totalSeat: missionData ? missionData.totalSeat : "",
      cityId: missionData ? missionData.cityId : "",
      startDate: missionData
        ? format(new Date(missionData.startDate), "yyyy-MM-dd")
        : "",
      endDate: missionData
        ? format(new Date(missionData.endDate), "yyyy-MM-dd")
        : "",
      registrationDeadline: missionData
        ? format(new Date(missionData.registrationDeadline), "yyyy-MM-dd")
        : "",
      goalObjective: missionData ? missionData.goalObjective : "",
      goalObjectiveAchieved: missionData
        ? missionData.goalObjectiveAchieved
        : "",
      goalObjectiveTitle: missionData ? missionData.goalObjectiveTitle : "",
      missionThemeId: missionData ? missionData.missionThemeId : "",
      missionType: missionData ? missionData.missionType : "",
      status: missionData ? missionData.status : "",
      thumbnailUrl: missionData ? missionData.thumbnailUrl : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });
  return (
    <>
      <AddEditFormLayout isAdd={isAdd}>
        <form onSubmit={formik.handleSubmit}>
          <AdminFormLabel>Title</AdminFormLabel>
          <AdminFormTextField
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            type="text"
          />
          <AdminFormLabel>Short Description</AdminFormLabel>
          <AdminFormTextField
            name="shortDescription"
            value={formik.values.shortDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.shortDescription &&
              Boolean(formik.errors.shortDescription)
            }
            helperText={
              formik.touched.shortDescription && formik.errors.shortDescription
            }
            type="text"
          />

          <AdminFormLabel>Description</AdminFormLabel>
          <TextEditor
            id="desc"
            name="desc"
            value={missionData ? missionData.description : ""}
            onChange={formik.handleChange}
          />

          <AdminFormLabel>Organization Name</AdminFormLabel>
          <AdminFormTextField
            name="organizationName"
            value={formik.values.organizationName}
            onChange={formik.handleChange}
            error={
              formik.touched.organizationName &&
              Boolean(formik.errors.organizationName)
            }
            helperText={
              formik.touched.organizationName && formik.errors.organizationName
            }
            type="text"
          />
          <AdminFormLabel>Organization Details</AdminFormLabel>
          <AdminFormTextField
            name="organizationDetails"
            value={formik.values.organizationDetails}
            onChange={formik.handleChange}
            error={
              formik.touched.organizationDetails &&
              Boolean(formik.errors.organizationDetails)
            }
            helperText={
              formik.touched.organizationDetails &&
              formik.errors.organizationDetails
            }
            type="text"
          />

          <AdminFormLabel>Availability</AdminFormLabel>
          <AdminFormTextField
            name="availability"
            value={formik.values.availability}
            onChange={formik.handleChange}
            error={
              formik.touched.availability && Boolean(formik.errors.availability)
            }
            helperText={
              formik.touched.availability && formik.errors.availability
            }
            type="number"
          />
          <AdminFormLabel>Total Seats</AdminFormLabel>
          <AdminFormTextField
            name="totalSeat"
            value={formik.values.totalSeat}
            onChange={formik.handleChange}
            error={formik.touched.totalSeat && Boolean(formik.errors.totalSeat)}
            helperText={formik.touched.totalSeat && formik.errors.totalSeat}
            type="number"
          />

          <AdminFormLabel>City Id</AdminFormLabel>
          <AdminFormTextField
            name="cityId"
            value={formik.values.cityId}
            onChange={formik.handleChange}
            error={formik.touched.cityId && Boolean(formik.errors.cityId)}
            helperText={formik.touched.cityId && formik.errors.cityId}
            type="number"
          />

          <AdminFormLabel>Start Date</AdminFormLabel>
          <AdminFormTextField
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
            type="date"
          />

          <AdminFormLabel>End Date</AdminFormLabel>
          <AdminFormTextField
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
            type="date"
          />
          <AdminFormLabel>Registration Deadline</AdminFormLabel>
          <AdminFormTextField
            name="registrationDeadline"
            value={formik.values.registrationDeadline}
            onChange={formik.handleChange}
            error={
              formik.touched.registrationDeadline &&
              Boolean(formik.errors.registrationDeadline)
            }
            helperText={
              formik.touched.registrationDeadline &&
              formik.errors.registrationDeadline
            }
            type="date"
          />

          <AdminFormLabel>Goal Objective</AdminFormLabel>
          <AdminFormTextField
            name="goalObjective"
            value={formik.values.goalObjective}
            onChange={formik.handleChange}
            error={
              formik.touched.goalObjective &&
              Boolean(formik.errors.goalObjective)
            }
            helperText={
              formik.touched.goalObjective && formik.errors.goalObjective
            }
            type="text"
          />
          <AdminFormLabel>Goal Objective Acheived</AdminFormLabel>
          <AdminFormTextField
            name="goalObjectiveAchieved"
            value={formik.values.goalObjectiveAchieved}
            onChange={formik.handleChange}
            error={
              formik.touched.goalObjectiveAchieved &&
              Boolean(formik.errors.goalObjectiveAchieved)
            }
            helperText={
              formik.touched.goalObjectiveAchieved &&
              formik.errors.goalObjectiveAchieved
            }
            type="text"
          />
          <AdminFormLabel>Goal Objective Title</AdminFormLabel>
          <AdminFormTextField
            name="goalObjectiveTitle"
            value={formik.values.goalObjectiveTitle}
            onChange={formik.handleChange}
            error={
              formik.touched.goalObjectiveTitle &&
              Boolean(formik.errors.goalObjectiveTitle)
            }
            helperText={
              formik.touched.goalObjectiveTitle &&
              formik.errors.goalObjectiveTitle
            }
            type="text"
          />
          <AdminFormLabel>Mission Theme</AdminFormLabel>
          <AdminFormTextField
            name="missionThemeId"
            value={formik.values.missionThemeId}
            onChange={formik.handleChange}
            error={
              formik.touched.title && Boolean(formik.errors.missionThemeId)
            }
            helperText={formik.touched.title && formik.errors.missionThemeId}
            type="text"
          />
          <AdminFormLabel>Mission Type</AdminFormLabel>
          <AdminFormTextField
            name="missionType"
            value={formik.values.missionType}
            onChange={formik.handleChange}
            error={
              formik.touched.missionType && Boolean(formik.errors.missionType)
            }
            helperText={formik.touched.missionType && formik.errors.missionType}
            type="text"
          />
          <AdminFormLabel>Mission Status</AdminFormLabel>
          <AdminFormTextField
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            type="text"
          />
          <AdminFormLabel>Thumbnail</AdminFormLabel>
          <AdminFormTextField
            name="thumbnailUrl"
            value={formik.values.thumbnailUrl}
            onChange={formik.handleChange}
            error={
              formik.touched.thumbnailUrl && Boolean(formik.errors.thumbnailUrl)
            }
            helperText={
              formik.touched.thumbnailUrl && formik.errors.thumbnailUrl
            }
            type="text"
          />
          {/* <img src="https://apit1.web2.anasource.com//Media//Images//Mission//712b6ebe-d69b-4fc7-be68-e7e0c7bd5273.jpg" /> */}

          <CancelButton>Cancel</CancelButton>
          <Button type="submit">Save</Button>
        </form>
      </AddEditFormLayout>
    </>
  );
};
export default MissionAddEdit;
