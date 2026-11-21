# Real Estate Database Schema & Data Dictionary

Comprehensive 3NF schema specifications for the Real Estate Management Platform.

## Core Entities

### 1. `properties`
- `id` (INT AUTO_INCREMENT PRIMARY KEY): Unique property ID.
- `title` (VARCHAR(255) NOT NULL): Display title.
- `price` (DECIMAL(12,2) NOT NULL): Sale or valuation price.
- `location` (VARCHAR(150)): City, state, micro-market.
- `bedrooms` (TINYINT): Bedroom count.
- `bathrooms` (TINYINT): Bathroom count.
- `square_footage` (INT): Covered area in sq ft.
- `type` (ENUM('House', 'Apartment', 'Condo', 'Commercial')).

### 2. `leases`
- `id` (INT AUTO_INCREMENT PRIMARY KEY): Lease agreement identifier.
- `property_id` (INT NOT NULL, FK -> properties.id).
- `tenant_id` (INT NOT NULL, FK -> tenants.id).
- `monthly_rent` (DECIMAL(10,2) NOT NULL).
- `security_deposit` (DECIMAL(10,2) NOT NULL).
- `start_date` (DATE NOT NULL).
- `end_date` (DATE NOT NULL).
- `status` (ENUM('ACTIVE', 'PENDING', 'TERMINATED', 'DEFAULTED')).
