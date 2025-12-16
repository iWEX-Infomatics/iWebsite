# ERPNext/Frappe DocType Field Mapping Guide

## Overview

This document provides a comprehensive mapping of ERPNext/Frappe standard DocTypes that can be used to populate the iWEX Website with dynamic data from your ERPNext system.

## Table of Contents

1. [Company Information](#company-information)
2. [Products/Items](#productsitems)
3. [Customers & Testimonials](#customers--testimonials)
4. [Contact Information](#contact-information)
5. [Team Members](#team-members)
6. [Blog Posts](#blog-posts)
7. [Projects/Case Studies](#projectscase-studies)
8. [Implementation Guide](#implementation-guide)

---

## 1. Company Information

### DocType: **Company**

Use this to populate About section and general company information.

| ERPNext Field | Website Section | iWEX Field | API Mapping |
|--------------|----------------|------------|-------------|
| `company_name` | About | about_title | Company name |
| `company_description` | About | about_description | Company description |
| `abbr` | - | - | Company abbreviation |
| `default_currency` | - | - | For pricing display |
| `country` | Contact | contact_address | Country |
| `phone_no` | Contact | contact_phone | Phone number |
| `email` | Contact | contact_email | Email address |
| `website` | Footer | - | Website URL |

**Example API Implementation:**

```python
@frappe.whitelist(allow_guest=True)
def get_company_info(company_name=None):
    """Fetch company information for website"""
    if not company_name:
        company_name = frappe.defaults.get_global_default("company")
    
    company = frappe.get_doc("Company", company_name)
    
    return {
        "success": True,
        "data": {
            "name": company.company_name,
            "description": company.company_description or "",
            "phone": company.phone_no or "",
            "email": company.email or "",
            "country": company.country or "",
            "currency": company.default_currency
        }
    }
```

---

## 2. Products/Items

### DocType: **Item**

Use this to populate Services section with your actual products/services.

| ERPNext Field | Website Section | iWEX Field | Notes |
|--------------|----------------|------------|-------|
| `item_code` | Services | - | Unique identifier |
| `item_name` | Services | service_name | Display name |
| `description` | Services | short_description | Brief description |
| `web_long_description` | Services | full_description | Detailed description |
| `image` | Services | service_image | Product image |
| `item_group` | Services | - | For categorization |
| `standard_rate` | Services | - | Pricing (optional) |
| `is_sales_item` | Services | is_published | Show only sales items |
| `show_in_website` | Services | is_published | Website visibility |
| `website_image` | Services | service_image | Optimized web image |
| `route` | Services | - | URL slug |

### DocType: **Item Group**

Use for service categories.

| ERPNext Field | Website Use | Notes |
|--------------|-------------|-------|
| `item_group_name` | Service categories | Group name |
| `description` | Category description | HTML content |
| `image` | Category icon | Category image |
| `parent_item_group` | Nested categories | Hierarchy |
| `show_in_website` | Visibility control | Boolean |

**Example API Implementation:**

```python
@frappe.whitelist(allow_guest=True)
def get_items_for_website():
    """Fetch published items/services for website"""
    items = frappe.get_all(
        "Item",
        filters={
            "show_in_website": 1,
            "is_sales_item": 1,
            "disabled": 0
        },
        fields=[
            "name",
            "item_name",
            "item_code",
            "description",
            "web_long_description",
            "website_image",
            "image",
            "item_group",
            "standard_rate",
            "route"
        ],
        order_by="modified desc"
    )
    
    # Get item group for each item
    for item in items:
        if item.item_group:
            group = frappe.get_value(
                "Item Group",
                item.item_group,
                ["item_group_name", "description"],
                as_dict=True
            )
            item["category"] = group
    
    return {
        "success": True,
        "data": items
    }
```

---

## 3. Customers & Testimonials

### DocType: **Customer**

Use for testimonials and client showcase.

| ERPNext Field | Website Section | iWEX Field | Notes |
|--------------|----------------|------------|-------|
| `customer_name` | Testimonials | client_name | Client name |
| `customer_group` | - | - | For filtering |
| `territory` | - | - | Location |
| `website` | Testimonials | - | Client website |
| `image` | Testimonials | client_image | Client logo |
| `customer_primary_contact` | - | - | Contact person |

### DocType: **Contact**

Use for detailed contact information.

| ERPNext Field | Website Use | Notes |
|--------------|-------------|-------|
| `first_name` | Testimonial author | Contact name |
| `last_name` | Testimonial author | Last name |
| `designation` | Testimonials | client_designation | Job title |
| `company_name` | Testimonials | company | Company name |
| `email_id` | - | - | Email |
| `phone` | - | - | Phone |
| `image` | Testimonials | client_image | Profile picture |

### DocType: **Communication** (for reviews/feedback)

| ERPNext Field | Website Use | Notes |
|--------------|-------------|-------|
| `content` | Testimonials | testimonial_text | Feedback content |
| `reference_doctype` | - | Link to Customer |
| `reference_name` | - | Customer ID |
| `subject` | - | Review title |
| `rating` | Testimonials | rating | Star rating (if custom field) |
| `creation` | - | Date |

**Example API Implementation:**

```python
@frappe.whitelist(allow_guest=True)
def get_customer_testimonials():
    """Fetch customer testimonials from ERPNext"""
    # Get customers with custom testimonial field
    customers = frappe.get_all(
        "Customer",
        filters={
            "disabled": 0,
            "custom_show_testimonial": 1  # Custom field
        },
        fields=[
            "name",
            "customer_name",
            "image",
            "custom_testimonial_text",
            "custom_testimonial_rating",
            "customer_group"
        ]
    )
    
    testimonials = []
    for customer in customers:
        # Get primary contact
        contact = frappe.get_value(
            "Dynamic Link",
            {
                "link_doctype": "Customer",
                "link_name": customer.name,
                "parenttype": "Contact"
            },
            "parent"
        )
        
        if contact:
            contact_details = frappe.get_doc("Contact", contact)
            testimonials.append({
                "client_name": customer.customer_name,
                "company": customer.customer_name,
                "designation": contact_details.designation or "",
                "testimonial_text": customer.custom_testimonial_text or "",
                "rating": customer.custom_testimonial_rating or 5,
                "client_image": customer.image or "",
                "display_order": 0
            })
    
    return {
        "success": True,
        "data": testimonials
    }
```

---

## 4. Contact Information

### DocType: **Address**

Use for company address information.

| ERPNext Field | Website Section | iWEX Field | Notes |
|--------------|----------------|------------|-------|
| `address_line1` | Contact | contact_address | Street address |
| `address_line2` | Contact | contact_address | Additional address |
| `city` | Contact | contact_address | City |
| `state` | Contact | contact_address | State/Province |
| `country` | Contact | contact_address | Country |
| `pincode` | Contact | contact_address | Postal code |
| `phone` | Contact | contact_phone | Phone number |
| `email_id` | Contact | contact_email | Email |
| `is_primary_address` | - | - | Primary flag |
| `address_type` | - | - | Office/Branch |

**Example API Implementation:**

```python
@frappe.whitelist(allow_guest=True)
def get_company_address(company_name=None):
    """Fetch company address for website"""
    if not company_name:
        company_name = frappe.defaults.get_global_default("company")
    
    # Get primary address
    address_name = frappe.get_value(
        "Dynamic Link",
        {
            "link_doctype": "Company",
            "link_name": company_name,
            "parenttype": "Address"
        },
        "parent"
    )
    
    if address_name:
        address = frappe.get_doc("Address", address_name)
        
        # Format address
        address_parts = [
            address.address_line1,
            address.address_line2,
            address.city,
            address.state,
            address.country,
            address.pincode
        ]
        formatted_address = ", ".join([part for part in address_parts if part])
        
        return {
            "success": True,
            "data": {
                "address": formatted_address,
                "phone": address.phone or "",
                "email": address.email_id or "",
                "city": address.city or "",
                "state": address.state or "",
                "country": address.country or "",
                "pincode": address.pincode or ""
            }
        }
    
    return {"success": False, "message": "Address not found"}
```

---

## 5. Team Members

### DocType: **Employee**

Use for team/about section.

| ERPNext Field | Website Section | Notes |
|--------------|----------------|-------|
| `employee_name` | Team | Full name |
| `designation` | Team | Job title |
| `department` | Team | Department |
| `bio` | Team | Biography (custom field) |
| `image` | Team | Profile photo |
| `company_email` | Team | Email |
| `cell_number` | Team | Phone |
| `status` | - | Active only |
| `custom_linkedin_url` | Team | LinkedIn profile |
| `custom_show_on_website` | Team | Visibility flag |

**Example API Implementation:**

```python
@frappe.whitelist(allow_guest=True)
def get_team_members():
    """Fetch team members for website"""
    employees = frappe.get_all(
        "Employee",
        filters={
            "status": "Active",
            "custom_show_on_website": 1  # Custom field
        },
        fields=[
            "employee_name",
            "designation",
            "department",
            "image",
            "company_email",
            "custom_bio",
            "custom_linkedin_url",
            "custom_display_order"
        ],
        order_by="custom_display_order asc"
    )
    
    return {
        "success": True,
        "data": employees
    }
```

---

## 6. Blog Posts

### DocType: **Blog Post**

ERPNext has built-in blog functionality.

| ERPNext Field | Website Use | Notes |
|--------------|-------------|-------|
| `title` | Blog | Post title |
| `blog_intro` | Blog | Excerpt |
| `content` | Blog | Full content (HTML) |
| `published` | Blog | Visibility |
| `blogger` | Blog | Author |
| `blog_category` | Blog | Category |
| `meta_image` | Blog | Featured image |
| `route` | Blog | URL slug |
| `published_on` | Blog | Publish date |
| `meta_title` | Blog | SEO title |
| `meta_description` | Blog | SEO description |

**Example API Implementation:**

```python
@frappe.whitelist(allow_guest=True)
def get_blog_posts(limit=10):
    """Fetch published blog posts"""
    posts = frappe.get_all(
        "Blog Post",
        filters={"published": 1},
        fields=[
            "name",
            "title",
            "blog_intro",
            "content",
            "blogger",
            "blog_category",
            "meta_image",
            "route",
            "published_on",
            "meta_title",
            "meta_description"
        ],
        order_by="published_on desc",
        limit=limit
    )
    
    # Get blogger details
    for post in posts:
        if post.blogger:
            blogger = frappe.get_value(
                "Blogger",
                post.blogger,
                ["full_name", "avatar"],
                as_dict=True
            )
            post["author"] = blogger
    
    return {
        "success": True,
        "data": posts
    }
```

---

## 7. Projects/Case Studies

### DocType: **Project**

Use for portfolio/case studies.

| ERPNext Field | Website Use | Notes |
|--------------|-------------|-------|
| `project_name` | Portfolio | Project title |
| `customer` | Portfolio | Client name |
| `project_type` | Portfolio | Category |
| `status` | - | Completed only |
| `notes` | Portfolio | Description |
| `expected_start_date` | Portfolio | Start date |
| `expected_end_date` | Portfolio | End date |
| `custom_project_image` | Portfolio | Featured image |
| `custom_technologies` | Portfolio | Tech stack |
| `custom_show_on_website` | Portfolio | Visibility |

**Example API Implementation:**

```python
@frappe.whitelist(allow_guest=True)
def get_projects():
    """Fetch completed projects for portfolio"""
    projects = frappe.get_all(
        "Project",
        filters={
            "status": "Completed",
            "custom_show_on_website": 1
        },
        fields=[
            "name",
            "project_name",
            "customer",
            "project_type",
            "notes",
            "expected_start_date",
            "expected_end_date",
            "custom_project_image",
            "custom_technologies",
            "custom_project_url"
        ],
        order_by="expected_end_date desc"
    )
    
    # Get customer details
    for project in projects:
        if project.customer:
            customer = frappe.get_value(
                "Customer",
                project.customer,
                ["customer_name", "image"],
                as_dict=True
            )
            project["client"] = customer
    
    return {
        "success": True,
        "data": projects
    }
```

---

## 8. Implementation Guide

### Step 1: Add Custom Fields

Add these custom fields to standard DocTypes:

#### Customer DocType:
```python
# Execute in Frappe console
frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Customer",
    "fieldname": "custom_show_testimonial",
    "label": "Show as Testimonial",
    "fieldtype": "Check",
    "insert_after": "image"
}).insert()

frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Customer",
    "fieldname": "custom_testimonial_text",
    "label": "Testimonial Text",
    "fieldtype": "Text",
    "insert_after": "custom_show_testimonial"
}).insert()

frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Customer",
    "fieldname": "custom_testimonial_rating",
    "label": "Rating",
    "fieldtype": "Select",
    "options": "5\n4\n3\n2\n1",
    "default": "5",
    "insert_after": "custom_testimonial_text"
}).insert()
```

#### Employee DocType:
```python
frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Employee",
    "fieldname": "custom_show_on_website",
    "label": "Show on Website",
    "fieldtype": "Check",
    "insert_after": "image"
}).insert()

frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Employee",
    "fieldname": "custom_bio",
    "label": "Biography",
    "fieldtype": "Text Editor",
    "insert_after": "custom_show_on_website"
}).insert()

frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Employee",
    "fieldname": "custom_linkedin_url",
    "label": "LinkedIn URL",
    "fieldtype": "Data",
    "insert_after": "custom_bio"
}).insert()

frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Employee",
    "fieldname": "custom_display_order",
    "label": "Display Order",
    "fieldtype": "Int",
    "default": "0",
    "insert_after": "custom_linkedin_url"
}).insert()
```

#### Project DocType:
```python
frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Project",
    "fieldname": "custom_show_on_website",
    "label": "Show on Website",
    "fieldtype": "Check",
    "insert_after": "status"
}).insert()

frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Project",
    "fieldname": "custom_project_image",
    "label": "Project Image",
    "fieldtype": "Attach Image",
    "insert_after": "custom_show_on_website"
}).insert()

frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Project",
    "fieldname": "custom_technologies",
    "label": "Technologies Used",
    "fieldtype": "Small Text",
    "insert_after": "custom_project_image"
}).insert()

frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Project",
    "fieldname": "custom_project_url",
    "label": "Project URL",
    "fieldtype": "Data",
    "insert_after": "custom_technologies"
}).insert()
```

### Step 2: Create API Endpoints

Add these functions to `iwex_website/api/website.py`:

```python
# Add all the example API implementations from above
```

### Step 3: Update Frontend

Modify Vue components to fetch from new endpoints:

```javascript
// In main.js, add new API calls
async function loadItemsAsServices() {
    const response = await fetch(`${API_BASE}.get_items_for_website`);
    const result = await response.json();
    return result.message.data;
}

async function loadCustomerTestimonials() {
    const response = await fetch(`${API_BASE}.get_customer_testimonials`);
    const result = await response.json();
    return result.message.data;
}
```

### Step 4: Configuration Options

Choose your approach:

**Option A: Use Custom iWEX DocTypes** (Current Implementation)
- Full control over fields
- No dependency on ERPNext data structure
- Manual data entry

**Option B: Use ERPNext Standard DocTypes** (Recommended for Integration)
- Leverage existing data
- Automatic updates
- Better integration

**Option C: Hybrid Approach** (Best of Both)
- Use ERPNext data where available
- Fall back to custom DocTypes
- Maximum flexibility

### Example Hybrid Implementation:

```python
@frappe.whitelist(allow_guest=True)
def get_services_hybrid():
    """Get services from Items or iWEX Service DocType"""
    
    # Try to get from Items first
    items = frappe.get_all(
        "Item",
        filters={"show_in_website": 1, "is_sales_item": 1},
        fields=["item_name", "description", "website_image"]
    )
    
    if items:
        return {"success": True, "data": items, "source": "Item"}
    
    # Fall back to custom DocType
    services = frappe.get_all(
        "iWEX Service",
        filters={"is_published": 1},
        fields=["service_name", "short_description", "icon"]
    )
    
    return {"success": True, "data": services, "source": "iWEX Service"}
```

---

## Summary Table

| Website Section | Primary DocType | Alternative DocType | Custom Fields Needed |
|----------------|----------------|---------------------|---------------------|
| About | Company | iWEX Website Settings | None |
| Services | Item | iWEX Service | show_in_website |
| Testimonials | Customer | iWEX Testimonial | custom_testimonial_* |
| Team | Employee | - | custom_show_on_website, custom_bio |
| Portfolio | Project | - | custom_show_on_website, custom_project_image |
| Blog | Blog Post | - | None (built-in) |
| Contact | Address, Company | iWEX Website Settings | None |

---

## Next Steps

1. **Decide on approach**: Custom DocTypes, ERPNext DocTypes, or Hybrid
2. **Add custom fields**: Use the scripts provided above
3. **Implement API endpoints**: Add functions to `api/website.py`
4. **Update frontend**: Modify Vue components to use new endpoints
5. **Test thoroughly**: Ensure data flows correctly
6. **Document for users**: Create user guide for data entry

---

## Support

For questions about ERPNext DocType integration:
- Email: emails@iwex.in
- ERPNext Documentation: https://docs.erpnext.com
- Frappe Framework Docs: https://frappeframework.com/docs

