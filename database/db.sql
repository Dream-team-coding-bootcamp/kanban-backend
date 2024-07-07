

CREATE TABLE boards (
    board_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE
);

