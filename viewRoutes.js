const path = require("path");

function PersonalInfoRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "./public/views/personalInfoView.html"));
}

function CredentialsRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "./public/views/credentialsView.html"));
}

function LoginRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "./public/views/loginView.html"));
}

function HomeRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "./public/views/homeView.html"));
}

function DatasRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "./public/views/datasView.html"));
}

function EditDatasRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "./public/views/editDatasView.html"));
}

function ChangePasswordRoute(req, res) {
  res.sendFile(
    path.resolve(__dirname, "./public/views/changePasswordView.html")
  );
}

module.exports = {
  PersonalInfoRoute,
  CredentialsRoute,
  LoginRoute,
  HomeRoute,
  DatasRoute,
  EditDatasRoute,
  ChangePasswordRoute,
};
