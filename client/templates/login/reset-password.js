Template.ForgotPassword.events({
  'submit #forgotPasswordForm': function (e, t) {
    e.preventDefault();
    $('#passwordResetEmailBox').hide();
    $('#resetLoader').css('visibility', 'visible');
    var forgotPasswordForm = $(e.currentTarget),
      email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

    if (isNotEmpty(email) && isEmail(email)) {

      Accounts.forgotPassword({ email: email }, function (err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
          } else {
            console.log('We are sorry but something went wrong.');
          }
        } else {
          console.log('Email Sent. Check your mailbox.');
          $('#resetLoader').css('visibility', 'hidden');
          sAlert.success('Email Sent. Check your mailbox.',
            {
              effect: 'slide', position: 'bottom-right', timeout: '8000', onRouteClose: false, stack: false, offset: '80px',
              onClose: function () {
                Router.go('/');
              }
            });
        }
      });

    }
    return false;
  },
});

var trimInput = function (val) {
  return val.replace(/^\s*|\s*$/g, "");
}


if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.ResetPassword.helpers({
  resetPassword: function () {
    return Session.get('resetPassword');
  }
});

Template.ResetPassword.events({
  'submit #resetPasswordForm': function (e, t) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
      password = resetPasswordForm.find('#resetPasswordPassword').val(),
      passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword(Session.get('resetPassword'), password, function (err) {
        if (err) {
          console.log('We are sorry but something went wrong.');
        } else {
          console.log('Your password has been changed. Welcome back!');
          Session.set('resetPassword', null);
        }
      });
    }
    return false;
  }
});