CREATE TABLE public.pets (
    id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    user_id INTEGER NOT NULL, -- Links to the users table
    pet_name CHARACTER VARYING(100) NOT NULL, -- Name of the pet
    type CHARACTER VARYING(50) NOT NULL CHECK (type IN ('dog', 'cat', 'reptile', 'amphibian', 'fish', 'small mammal', 'bird', 'insect', 'other')), -- Valid pet types
    species CHARACTER VARYING(50) NOT NULL, -- Further details on the pet
    age INTEGER NOT NULL CHECK (age >= 0), -- Non-negative age constraint
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Auto-set timestamp
    FOREIGN KEY (user_id) REFERENCES public.users (id) ON UPDATE CASCADE ON DELETE CASCADE -- Links user_id to users table
);
