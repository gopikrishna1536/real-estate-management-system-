-- ========================================================
-- Real Estate Management System — Relational MySQL Database
-- Normalized Schema (3NF) with Triggers, Views & Procedures
-- ========================================================

-- Drop tables if exists to allow clean re-runs
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS property_types;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS agents;

-- 1. AGENTS TABLE
CREATE TABLE agents (
    agent_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    commission_rate DECIMAL(4, 2) DEFAULT 0.03, -- 3% default commission
    total_sales DECIMAL(14, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CLIENTS TABLE
CREATE TABLE clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    max_budget DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. PROPERTY TYPES
CREATE TABLE property_types (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) UNIQUE NOT NULL, -- e.g. Apartment, Villa, Commercial, Open Plot
    description VARCHAR(255)
);

-- 4. PROPERTIES TABLE
CREATE TABLE properties (
    property_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    bedrooms INT DEFAULT 0,
    bathrooms INT DEFAULT 0,
    square_feet INT NOT NULL,
    type_id INT NOT NULL,
    agent_id INT NOT NULL,
    status ENUM('AVAILABLE', 'UNDER_CONTRACT', 'SOLD') DEFAULT 'AVAILABLE',
    listed_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (type_id) REFERENCES property_types(type_id) ON DELETE RESTRICT,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id) ON DELETE CASCADE
);

-- 5. TRANSACTIONS TABLE
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    client_id INT NOT NULL,
    agent_id INT NOT NULL,
    sale_price DECIMAL(12, 2) NOT NULL,
    commission_earned DECIMAL(10, 2) NOT NULL,
    transaction_date DATE DEFAULT (CURRENT_DATE),
    payment_method VARCHAR(50) DEFAULT 'Wire Transfer',
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE RESTRICT,
    FOREIGN KEY (client_id) REFERENCES clients(client_id) ON DELETE RESTRICT,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id) ON DELETE RESTRICT
);

-- ========================================================
-- TRIGGERS
-- ========================================================

-- Trigger: Automatically update property status to 'SOLD' and update agent total sales
DELIMITER $$
CREATE TRIGGER trg_after_transaction_insert
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN
    -- Mark property as sold
    UPDATE properties 
    SET status = 'SOLD' 
    WHERE property_id = NEW.property_id;

    -- Accumulate agent's total sales volume
    UPDATE agents 
    SET total_sales = total_sales + NEW.sale_price 
    WHERE agent_id = NEW.agent_id;
END$$
DELIMITER ;

-- ========================================================
-- VIEWS
-- ========================================================

-- View: Active property listings with formatted pricing and assigned agent details
CREATE OR REPLACE VIEW vw_active_properties AS
SELECT 
    p.property_id,
    p.title,
    p.city,
    p.price,
    pt.type_name AS property_type,
    p.square_feet,
    CONCAT(a.first_name, ' ', a.last_name) AS agent_name,
    a.phone AS agent_phone
FROM properties p
JOIN property_types pt ON p.type_id = pt.type_id
JOIN agents a ON p.agent_id = a.agent_id
WHERE p.status = 'AVAILABLE';

-- View: Agent performance leaderboard
CREATE OR REPLACE VIEW vw_agent_performance AS
SELECT 
    a.agent_id,
    CONCAT(a.first_name, ' ', a.last_name) AS agent_name,
    a.email,
    COUNT(t.transaction_id) AS total_transactions,
    COALESCE(SUM(t.sale_price), 0.00) AS total_revenue_generated,
    COALESCE(SUM(t.commission_earned), 0.00) AS total_commissions
FROM agents a
LEFT JOIN transactions t ON a.agent_id = t.agent_id
GROUP BY a.agent_id, a.first_name, a.last_name, a.email;

-- ========================================================
-- SEED DATA
-- ========================================================

INSERT INTO property_types (type_name, description) VALUES
('Luxury Villa', 'Independent premium multi-story residence'),
('Apartment', 'High-rise residential condominium'),
('Commercial Space', 'Office building or retail storefront'),
('Open Plot', 'Clear title residential approved layout');

INSERT INTO agents (first_name, last_name, email, phone, commission_rate) VALUES
('Gopi', 'Krishna', 'gopikrishna7223@gmail.com', '9876543210', 0.03),
('Suresh', 'Varma', 'suresh.varma@primeestates.com', '9123456789', 0.025),
('Priya', 'Sharma', 'priya.sharma@primeestates.com', '9988776655', 0.03);

INSERT INTO clients (first_name, last_name, email, phone, max_budget) VALUES
('Ramesh', 'Kumar', 'ramesh.k@gmail.com', '9811223344', 15000000.00),
('Ananya', 'Reddy', 'ananya.r@yahoo.com', '9877665544', 25000000.00),
('Vikram', 'Patel', 'vikram.p@outlook.com', '9766554433', 8500000.00);

INSERT INTO properties (title, address, city, price, bedrooms, bathrooms, square_feet, type_id, agent_id, status) VALUES
('Seaside Luxury Villa', 'Beach Road, Sagar Nagar', 'Visakhapatnam', 18500000.00, 4, 4, 3400, 1, 1, 'AVAILABLE'),
('Skyline Heights 3BHK Condominium', 'VIP Road, Siripuram', 'Visakhapatnam', 9500000.00, 3, 3, 1950, 2, 1, 'AVAILABLE'),
('Prime Commercial Office Floor', 'Tech Park, Madhurawada', 'Visakhapatnam', 32000000.00, 0, 4, 5200, 3, 2, 'AVAILABLE'),
('Greenfield Gated Community Plot', 'Bhogapuram Highway', 'Visakhapatnam', 4200000.00, 0, 0, 2400, 4, 3, 'AVAILABLE');
