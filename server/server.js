require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./src/schema");
const { resolvers } = require("./src/resolvers");
const { verifyToken } = require("./src/utils/verifyToken");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, ...rest }) => {
    let isAuthenticated = false;
    let user = null;
    try {
      // "authorization": "Bearer asdfj2093ur.02j3krlsjaf0.23r90fjsf"
      const authHeader = req.headers.authorization || "";
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        const payload = await verifyToken(token);
        isAuthenticated = payload && payload.sub ? true : false;
        // go get the user from the db
      }
    } catch (error) {
      console.error(error);
    }
    return { ...rest, req, auth: { user, isAuthenticated } };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
