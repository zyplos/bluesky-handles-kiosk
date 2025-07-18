/*
notes

CREATE TABLE claims (
    discord_id VARCHAR(255) PRIMARY KEY,
    handle VARCHAR(255) NOT NULL UNIQUE,
    did VARCHAR(255) NOT NULL UNIQUE,
    hostname VARCHAR(255) NOT NULL,
    date_claimed TIMESTAMP WITH TIME ZONE NOT NULL
);

*/
export interface ClaimData {
  discord_id: string;
  handle: string;
  did: string;
  hostname: string;
  date_claimed: string;
}
