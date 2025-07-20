/*
notes

CREATE TABLE claims (
    discord_id VARCHAR(255) NOT NULL,
    hostname VARCHAR(255) NOT NULL,
    handle VARCHAR(255) NOT NULL,
    did VARCHAR(255) NOT NULL,
    date_claimed TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- A user can only have one claim per hostname
    PRIMARY KEY (discord_id, hostname),
    
    -- A handle must be unique per hostname
    UNIQUE (handle, hostname),

    -- A DID must be unique per hostname
    UNIQUE (did, hostname)
);

*/
export interface ClaimData {
  discord_id: string;
  handle: string;
  did: string;
  hostname: string;
  date_claimed: string;
}

export interface DidResponse {
  did: string;
}
