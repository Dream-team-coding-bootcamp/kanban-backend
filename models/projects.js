import { pool } from "../db.js";

export const getProjects = async (req, res) => {
  const user_id = parseInt(req.params.user_id)
  const response = await pool.query("SELECT * FROM projects WHERE user_id = $1 ORDER BY id ASC") [user_id];
  res.status(200).json(response.rows);
};

export const getProjectById = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const project_id = parseInt(req.params.project_id);
  const response = await pool.query("SELECT * FROM projects WHERE user_id = $1 AND project_id = $2", [user_id, project_id]);
  res.json(response.rows);
};

export const createProject = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  try {
    const { name, description } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO projects (user_id, name, description) VALUES ($1, $2, $3)",
      [user_id, name, description]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const project_id = parseInt(req.params.project_id);
  const { name, description } = req.body;

  const { rows } = await pool.query(
    "UPDATE projects SET name = $1, description = $2 WHERE user_id = $3 AND project_id = $4",
    [name, description, user_id, project_id]
  );

  return res.json(rows[0]);
};

export const deleteProject = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const project_id = parseInt(req.params.project_id);
  const { rowCount } = await pool.query("DELETE FROM projects WHERE user_id = $1 AND project_id = $2", [user_id, project_id]);

  if (rowCount === 0) {
    return res.status(404).json({ message: "Project not found" });
  }

  return res.sendStatus(204);
};