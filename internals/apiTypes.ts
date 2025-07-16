/*
notes

claims | id (auto increment), discord_id (string), handle (string), did (string), date_claimed (Date)

CREATE TABLE claims (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discord_id VARCHAR(255) NOT NULL,
    handle VARCHAR(255) NOT NULL,
    did VARCHAR(255) NOT NULL,
    date_claimed DATETIME NOT NULL
);

*/
interface ClaimData {
  id: number;
  discord_id: string;
  handle: string;
  did: string;
  date_claimed: string;
}
