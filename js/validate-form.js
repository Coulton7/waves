$(document).ready(function() {
  $('.global-warming-form').validate({
    rules: {
      orgName: {
        required: true
      },
      orgEmail: {
        required: true,
        email: true
      },
      orgPhone: {
        required: true,
        maxlength: 18,
        digits: true
      },
      orgType: {
        required: true
      },
      roi: {
        required: true,
        range: [1,10]
      }
    }
  });
});
