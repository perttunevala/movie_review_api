USE movie_review_db;

INSERT INTO users (username, password_hash) VALUES
('matti', '$2b$10$WahgwLu4lej669xMNR4txe083m.UrcWA0U9DqPWQNSg39c/TZ5.5i'),
('liisa', '$2b$10$SRk.klZ3YfrKeEaYrvX0du4JjYgjT2hUOU9l3IgcYUqol4bNXoyfO'),
('pekka', '$2b$10$T6PeewA3a1/y8URK1xjw8.5RV75fZAXC3YEnNNQmzvbD76jBOaSQC'),
('anna', '$2b$10$Xp7mX4t2e/jFvsAH0YxMs.Z3guLxJbJ7IURFbTnPBoulSLbktGmWm'),
('sari', '$2b$10$TMPltuQBaP/HBiJzoQdwpuQeb/qAOQSmLl9F3GqyMnQjcj5M/Nf.q');

INSERT INTO movies (title, genre, release_year) VALUES
('Raiders of the Lost Ark', 'Adventure', 1981),
('Inception', 'Sci-Fi', 2010),
('The Matrix', 'Sci-Fi', 1999),
('Shutter Island', 'Thriller', 2010),
('Sinister', 'Horror', 2012),
('500 Days of Summer', 'Romance', 2009),
('Titanic', 'Romance', 1997);

INSERT INTO reviews (user_id, movie_id, review_date, rating, comment) VALUES
(1, 1, CURDATE(), 5, 'Hyva elokuva.'),
(2, 1, CURDATE(), 5, 'Tykkasin paljon.'),
(3, 1, CURDATE(), 4, 'Ihan hyva.'),
(2, 2, CURDATE(), 5, 'Todella hyva.'),
(3, 3, CURDATE(), 5, 'Hyva klassikko.'),
(4, 4, CURDATE(), 4, 'Melko hyva.'),
(5, 5, CURDATE(), 4, 'Aika pelottava.'),
(1, 6, CURDATE(), 4, 'Mukava elokuva.'),
(2, 7, CURDATE(), 5, 'Tosi hyva.');
