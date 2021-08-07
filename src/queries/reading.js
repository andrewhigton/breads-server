exports.insertReading = `INSERT INTO readings (title, domain, description, image, word_count, url) VALUES ?`;
exports.insertUserReading = `INSERT INTO user_readings (user_id, reading_id) VALUES (?, ?)`;
exports.selectReadingById = `SELECT * FROM readings WHERE id = ?`;
exports.updateFavorite = `INSERT INTO favorites (user_id, reading_id) VALUES (?, ?)`;
exports.deleteFavorite = `DELETE FROM favorites WHERE user_id = ? AND reading_id = ?`;
exports.deleteReading = `DELETE ur, f, rt FROM user_readings ur 
LEFT JOIN favorites f ON f.reading_id = ur.reading_id AND f.user_id = ur.user_id 
LEFT JOIN reading_tags rt ON rt.reading_id = ur.reading_ID 
WHERE ur.user_id = ? AND ur.reading_id = ?`;
exports.updateReading = `UPDATE readings SET ? WHERE id = ?`;
exports.selectReadingIdByUrl = `SELECT id FROM readings WHERE url = ?`;

exports.selectAllReadings = `
    SELECT 
        user_readings.reading_id,
        readings.title,
        readings.domain,
        readings.description,
        readings.image as readings_image,
        readings.word_count,
        readings.url,
        readings.created_at,
        user_readings.user_id,
        users.username,
        users.image,
        favorites.user_id as favorite,
        GROUP_CONCAT(reading_tags.tag_id) as tag_ids
    FROM user_readings
    LEFT JOIN readings ON readings.id = user_readings.reading_id
    LEFT JOIN users ON users.id = user_readings.user_id
    LEFT JOIN favorites ON favorites.reading_id = user_readings.reading_id
    LEFT JOIN reading_tags ON reading_tags.reading_id = user_readings.reading_id
    GROUP BY
        user_readings.reading_id,
        readings.title,
        readings.domain,
        readings.description,
        readings.image, 
        readings.word_count,
        readings.url,
        readings.created_at,
        user_readings.user_id,
        users.username,
        users.image,
        favorites.user_id
    ORDER BY user_readings.reading_id`;

exports.selectUserReadings = `
    SELECT 
        user_readings.reading_id,
        readings.title,
        readings.domain,
        readings.description,
        readings.image as readings_image,
        readings.word_count,
        readings.url,
        readings.created_at,
        user_readings.user_id,
        users.username,
        users.image,
        favorites.user_id as favorite,
        GROUP_CONCAT(reading_tags.tag_id) as tag_ids
    FROM user_readings
    LEFT JOIN readings ON readings.id = user_readings.reading_id
    LEFT JOIN users ON users.id = user_readings.user_id
    LEFT JOIN favorites ON favorites.reading_id = user_readings.reading_id
    LEFT JOIN reading_tags ON reading_tags.reading_id = user_readings.reading_id
    WHERE user_readings.user_id = ?
    GROUP BY
        user_readings.reading_id,
        readings.title,
        readings.domain,
        readings.description,
        readings.image, 
        readings.word_count,
        readings.url,
        readings.created_at,
        user_readings.user_id,
        users.username,
        users.image,
        favorites.user_id
    ORDER BY user_readings.reading_id DESC`;

exports.selectSubscriptionReadings = `
    SELECT
        user_readings.reading_id,
        readings.title,
        readings.domain,
        readings.description,
        readings.image as readings_image,
        readings.word_count,
        readings.url,
        readings.created_at,
        user_readings.user_id,
        users.username,
        users.image,
        favorites.user_id as favorite,
        GROUP_CONCAT(reading_tags.tag_id) as tag_ids
    FROM subscriptions
    INNER JOIN user_readings ON user_readings.user_id = publisher_id
    LEFT JOIN readings ON readings.id = user_readings.reading_id
    LEFT JOIN users ON users.id = user_readings.user_id
    LEFT JOIN favorites ON favorites.reading_id = user_readings.reading_id
    LEFT JOIN reading_tags ON reading_tags.reading_id = user_readings.reading_id
    WHERE subscriber_id = ?
    GROUP BY
        user_readings.reading_id,
        readings.title,
        readings.domain,
        readings.description,
        readings.image, 
        readings.word_count,
        readings.url,
        readings.created_at,
        user_readings.user_id,
        users.username,
        users.image,
        favorites.user_id
    ORDER BY user_readings.reading_id DESC`;

exports.selectFavoriteReadings = `
    SELECT
        favorites.reading_id,
        readings.title,
        readings.domain,
        readings.description,
        readings.image as readings_image,
        readings.word_count,
        readings.url,
        readings.created_at,
        favorites.user_id,
        users.username,
        users.image,
        favorites.user_id as favorite,
        GROUP_CONCAT(reading_tags.tag_id) as tag_ids
    FROM favorites
    LEFT JOIN readings ON readings.id = favorites.reading_id
    LEFT JOIN users ON users.id = favorites.user_id
    LEFT JOIN reading_tags ON reading_tags.reading_id = favorites.reading_id
    WHERE favorites.user_id = ?
    GROUP BY
        favorites.reading_id,
        readings.title,
        readings.domain,
        readings.description,
        readings.image, 
        readings.word_count,
        readings.url,
        readings.created_at,
        favorites.user_id,
        users.username,
        users.image,
        favorites.user_id
    ORDER BY readings.id DESC`;
