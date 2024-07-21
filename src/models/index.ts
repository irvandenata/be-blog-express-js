import Blog from "./blog";
import User from "./user";
import Role from "./role";



// Role.hasMany(User)
// User.belongsTo(Role)

Blog.belongsTo(User, { as: "author" })
User.hasMany(Blog, { as: "blogs", foreignKey: "authorId" })
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });

// Review.belongsTo(User, { as: "owner" })
// User.hasMany(Review, { as: "reviews", foreignKey: "ownerId" })

// Category.hasMany(Blog)
// Blog.belongsTo(Category)

// Blog.hasMany(Review)
// Review.belongsTo(Blog)

// export { Blog, Category, Review, Role, User }
export { Blog,  User, Role }

