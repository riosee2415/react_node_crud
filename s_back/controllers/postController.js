const db = require("../db/connectionPool");

const queryPrint = (query) => {
  console.log(
    `🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀 SQL 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀`
  );
  console.log(query);
  console.log(
    `🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀`
  );
};

const getListContoller = async (req, res, next) => {
  let sqlQuery = `
    SELECT	id,
            title,
            content,
            author,
            hit,
            DATE_FORMAT(createdAt, '%Y-%m-%d')	AS createdAt
      FROM	posts
     WHERE  1=1
       AND  isDelete = ${false}
     ORDER	BY	createdAt DESC                
    `;

  queryPrint(sqlQuery);

  const posts = await db.query(sqlQuery);

  return res.status(200).json(posts[0]);
};

const getDetailContoller = async (req, res, next) => {
  const { postId } = req.params;

  const isNotNumber = isNaN(Number(postId));

  if (isNotNumber) {
    return res.status(403).send("그런 게시글을 조회할 수 없어요!");
  }

  let sqlQuery = `
  SELECT	id,
            title,
            content,
            author,
            hit,
            DATE_FORMAT(createdAt, '%Y-%m-%d')	AS createdAt
      FROM	posts
     WHERE  1=1
  `;

  sqlQuery += `AND	id = ${postId}`;

  queryPrint(sqlQuery);
  const post = await db.query(sqlQuery);

  const newHit = post[0][0]["hit"] + 1;
  post[0][0]["hit"] = newHit;

  const updateQuery = `
    UPDATE  posts
       SET  hit = ${newHit}
     WHERE  id = ${postId}
  `;

  queryPrint(updateQuery);
  const upateResult = await db.query(updateQuery);

  return res.status(200).json(post[0][0]);
};

const getCreateContoller = (req, res, next) => {};

const postCreatecontoller = async (req, res, next) => {
  const { title, content, author } = req.body;

  let insertQuery = `
  INSERT INTO posts(
            title,
            content,
            author
    ) VALUES (
            "${title}",
            "${content}",
            "${author}"
        )
  `;

  const createResult = await db.query(insertQuery);

  const currentInsertId = createResult[0]["insertId"];

  return res.status(201).json({ currentInsertId });
};
const getUpdatecontoller = (req, res, next) => {};
const postUpdatecontoller = (req, res, next) => {};
const deleteDeleteContoller = (req, res, next) => {};

const postControllers = {
  getListContoller,
  getDetailContoller,
  getCreateContoller,
  postCreatecontoller,
  getUpdatecontoller,
  postUpdatecontoller,
  deleteDeleteContoller,
};

module.exports = postControllers;
