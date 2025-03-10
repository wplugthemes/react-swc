window.clerkJWTTemplates = {
  convex: {
    issuer: "devoted-squid-31.clerk.accounts.dev",
    template: {
      sub: "{{user.id}}",
      iss: "devoted-squid-31.clerk.accounts.dev",
      exp: "{{jwt.exp}}",
      iat: "{{jwt.iat}}",
      name: "{{user.first_name}} {{user.last_name}}",
      email: "{{user.primary_email_address}}",
    },
  },
};
