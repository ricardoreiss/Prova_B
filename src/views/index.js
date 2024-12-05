const path = require("path");

function PersonalInfoRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "personalInfoView.html"));
}

function CredentialsRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "credentialsView.html"));
}

function LoginRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "loginView.html"));
}

function HomeRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "homeView.html"));
}

function DatasRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "datasView.html"));
}

function EditDatasRoute(req, res) {
  res.sendFile(path.resolve(__dirname, "editDatasView.html"));
}

function ChangePasswordRoute(req, res) {
  res.sendFile(
    path.resolve(__dirname, "changePasswordView.html")
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
