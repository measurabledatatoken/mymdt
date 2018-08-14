const userEmails = require('../shared/userEmails');

const userObjects = userEmails.map(userEmail => {
  return {
    email_address: userEmail,
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbEFkZHJlc3MiOiJ0ZXN0MDAxQGppYW54aW5hcHAuY29tIiwiQXBwSUQiOiI1ODkxMzU3ZGMyNGE0YzFlYTdlMDc5OWVkNzhiYzE3MiIsIlVzZXJJRCI6ImJmODJlMTRhNDk4MjRhM2U5YTY5NDMzMjY4NTBlNDdjIiwiSXNBcHBPd25lciI6ZmFsc2UsIkxvZ2luTWV0aG9kIjoyLCJleHAiOjE1MzQyMjk4ODMsImlzcyI6Ik1EVCBGb3VuZGF0aW9uIn0.hTRSfwc7_D3WT6yBBzQHlTILIx5Sno-Avoq047hELS0',
    claimed_amount: 0,
    claimable_amount: 0,
  };
});

module.exports = {
  valid: userObjects,
  invalid: [],
};
