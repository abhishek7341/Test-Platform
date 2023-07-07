import Avatar from "@mui/material/Avatar";
const AdminAvatar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar alt="Image not found" sx={{ mr: 1 }} />
        <span>UserName</span>
      </div>
    </>
  );
};
export default AdminAvatar;
