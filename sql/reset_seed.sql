USE movie_review_db;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE reviews;
TRUNCATE TABLE movies;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO users (user_id, username, password_hash) VALUES
(1, 'matti', '$2b$10$WahgwLu4lej669xMNR4txe083m.UrcWA0U9DqPWQNSg39c/TZ5.5i'),
(2, 'liisa', '$2b$10$SRk.klZ3YfrKeEaYrvX0du4JjYgjT2hUOU9l3IgcYUqol4bNXoyfO'),
(3, 'pekka', '$2b$10$T6PeewA3a1/y8URK1xjw8.5RV75fZAXC3YEnNNQmzvbD76jBOaSQC'),
(4, 'anna', '$2b$10$Xp7mX4t2e/jFvsAH0YxMs.Z3guLxJbJ7IURFbTnPBoulSLbktGmWm'),
(5, 'sari', '$2b$10$TMPltuQBaP/HBiJzoQdwpuQeb/qAOQSmLl9F3GqyMnQjcj5M/Nf.q');

INSERT INTO movies (movie_id, title, genre, release_year) VALUES
(1, 'Raiders of the Lost Ark', 'Adventure', 1981),
(2, 'Inception', 'Sci-Fi', 2010),
(3, 'The Matrix', 'Sci-Fi', 1999),
(4, 'Shutter Island', 'Thriller', 2010),
(5, 'Sinister', 'Horror', 2012),
(6, '500 Days of Summer', 'Romance', 2009),
(7, 'Titanic', 'Romance', 1997);

INSERT INTO reviews (review_id, user_id, movie_id, review_date, rating, comment) VALUES
(1, 1, 1, CURDATE(), 5, 'Indiana Jones on kestoklassikko, jonka pariin palaa aina uudestaan.'),
(2, 2, 1, CURDATE(), 5, 'Seikkailu, huumori ja musiikki toimivat edelleen erinomaisesti.'),
(3, 3, 1, CURDATE(), 4, 'Vauhdikas aarteenmetsästys, jossa ei juuri ole tylsiä hetkiä.'),
(4, 2, 2, CURDATE(), 5, 'Inception on älykäs ja näyttävä scifi, joka palkitsee uudelleenkatselun.'),
(5, 3, 3, CURDATE(), 5, 'Tyylikäs scifi-klassikko, joka muutti toimintaelokuvia pysyvästi.'),
(6, 4, 4, CURDATE(), 4, 'Shutter Island on synkkä ja taitavasti rakennettu mysteeri.'),
(7, 5, 5, CURDATE(), 4, 'Sinister on tehokas kauhuelokuva, jossa tunnelma pysyy painostavana.'),
(8, 1, 6, CURDATE(), 4, '500 Days of Summer on raikas ja vähän haikea kuvaus ihastumisesta.'),
(9, 2, 7, CURDATE(), 5, 'Titanic on suuri romanttinen draama, joka toimii edelleen tunteella.');
