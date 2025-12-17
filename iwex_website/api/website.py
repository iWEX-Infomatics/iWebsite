# Copyright (c) 2025, iWEX Infomatics and contributors
# For license information, please see license.txt

import frappe
from frappe import _
import json

@frappe.whitelist(allow_guest=True)
def get_website_settings():
	"""
	Get website settings including hero, about, contact, and SEO information
	"""
	try:
		if frappe.db.exists("iWEX Website Settings", "iWEX Website Settings"):
			settings = frappe.get_doc("iWEX Website Settings", "iWEX Website Settings")
			
			return {
				"success": True,
				"data": {
					"branding": {
						"company_name": settings.company_name or "iWEX Infomatics",
						"tagline": settings.tagline or "",
						"logo": settings.company_logo or "",
						"logo_dark": settings.company_logo_dark or "",
						"favicon": settings.favicon or ""
					},
					"founder": {
						"name": settings.founder_name or "Ameer Babu",
						"title": settings.founder_title or "Founder & Chief Consultant",
						"image": settings.founder_image or "",
						"bio": settings.founder_bio or "",
						"certifications": settings.founder_certifications or ""
					},
					"chatbot": {
						"enabled": settings.enable_chatbot or True,
						"whatsapp_business": settings.whatsapp_business_number or "+919349125225",
						"whatsapp_api": settings.whatsapp_api_number or "+919744763336",
						"telegram_username": settings.telegram_bot_username or "@iWEXinfo_bot",
						"telegram_id": settings.telegram_bot_id or "",
						"greeting": settings.chatbot_greeting_message or "Hello! 👋 Welcome to iWEX Infomatics."
					},
					"stats": {
						"clients": settings.stat_clients_count or 150,
						"years": settings.stat_years_experience or 9,
						"industries": settings.stat_industries_served or 5,
						"projects": settings.stat_projects_completed or 200,
						"team": settings.stat_team_size or 15
					},
					"hero": {
						"title": settings.hero_title or "Welcome to iWEX Infomatics",
						"subtitle": settings.hero_subtitle or "Innovative Web Solutions",
						"cta_text": settings.hero_cta_text or "Get Started",
						"cta_link": settings.hero_cta_link or "#contact",
						"secondary_cta_text": settings.hero_secondary_cta_text or "Our Services",
						"secondary_cta_link": settings.hero_secondary_cta_link or "#services",
						"image": settings.hero_image or "",
						"video_url": settings.hero_video_url or ""
					},
					"about": {
						"title": settings.about_title or "About iWEX Infomatics",
						"description": settings.about_description or "",
						"image": settings.about_image or "",
						"mission": settings.about_mission or "",
						"vision": settings.about_vision or ""
					},
				"contact": {
					"email": settings.contact_email or "emails@iwex.in",
					"phone": settings.contact_phone or "+91 97447 83338",
					"address": settings.contact_address or "S41, SBC2, Thapasya, Phase 1, Infopark Kochi, Kerala, India - 682042",
					"map_url": settings.contact_map_url or ""
				},
					"social": {
						"facebook": settings.facebook_url or "",
						"twitter": settings.twitter_url or "",
						"linkedin": settings.linkedin_url or "",
						"instagram": settings.instagram_url or "",
						"youtube": settings.youtube_url or "",
						"github": settings.github_url or ""
					},
					"seo": {
						"meta_title": settings.meta_title or "iWEX Infomatics",
						"meta_description": settings.meta_description or "",
						"meta_keywords": settings.meta_keywords or "",
						"og_image": settings.og_image or "",
						"google_analytics_id": settings.google_analytics_id or ""
					}
				}
			}
		else:
			# Return default values if settings don't exist
			return {
				"success": True,
				"data": {
					"branding": {
						"company_name": "iWEX Infomatics",
						"tagline": "",
						"logo": "",
						"logo_dark": "",
						"favicon": ""
					},
					"founder": {
						"name": "Ameer Babu",
						"title": "Founder & Chief Consultant",
						"image": "",
						"bio": "",
						"certifications": "World's First Frappe Certified Consultant (Manufacturing, HR & Payroll)"
					},
					"chatbot": {
						"enabled": True,
						"whatsapp_business": "+919349125225",
						"whatsapp_api": "+919744763336",
						"telegram_username": "@iWEXinfo_bot",
						"telegram_id": "",
						"greeting": "Hello! 👋 Welcome to iWEX Infomatics.\n\nI'm here to help you with ERPNext Manufacturing, HR & Payroll solutions."
					},
					"stats": {
						"clients": 150,
						"years": 9,
						"industries": 5,
						"projects": 200,
						"team": 15
					},
					"hero": {
						"title": "Welcome to iWEX Infomatics",
						"subtitle": "Transforming businesses through innovative web solutions",
						"cta_text": "Get Started",
						"cta_link": "#contact",
						"secondary_cta_text": "Our Services",
						"secondary_cta_link": "#services",
						"image": "",
						"video_url": ""
					},
					"about": {
						"title": "About iWEX Infomatics",
						"description": "We are a leading provider of innovative web solutions.",
						"image": "",
						"mission": "To empower businesses with innovative technology solutions.",
						"vision": "To be the most trusted partner for digital transformation."
					},
				"contact": {
					"email": "emails@iwex.in",
					"phone": "+91 97447 83338",
					"address": "S41, SBC2, Thapasya, Phase 1, Infopark Kochi, Kerala, India - 682042",
					"map_url": ""
				},
					"social": {
						"facebook": "",
						"twitter": "",
						"linkedin": "",
						"instagram": "",
						"youtube": "",
						"github": ""
					},
					"seo": {
						"meta_title": "iWEX Infomatics",
						"meta_description": "Innovative Web Solutions",
						"meta_keywords": "",
						"og_image": "",
						"google_analytics_id": ""
					}
				}
			}
	except Exception as e:
		frappe.log_error(f"Error fetching website settings: {str(e)}")
		return {
			"success": False,
			"message": _("Error fetching website settings")
		}

@frappe.whitelist(allow_guest=True)
def get_services():
	"""
	Get all published services with their features
	"""
	try:
		services = frappe.get_all(
			"iWEX Service",
			filters={"is_published": 1},
			fields=[
				"name",
				"service_name",
				"icon",
				"icon_class",
				"short_description",
				"full_description",
				"service_image",
				"service_image_alt",
				"display_order"
			],
			order_by="display_order asc"
		)
		
		# Get features for each service
		for service in services:
			features = frappe.get_all(
				"iWEX Service Feature",
				filters={"parent": service.name},
				fields=["feature_title", "feature_description"],
				order_by="idx asc"
			)
			service["features"] = features
		
		return {
			"success": True,
			"data": services
		}
	except Exception as e:
		frappe.log_error(f"Error fetching services: {str(e)}")
		return {
			"success": False,
			"message": _("Error fetching services")
		}

@frappe.whitelist(allow_guest=True)
def get_faqs(category=None):
	"""
	Get all published FAQs, optionally filtered by category
	"""
	try:
		filters = {"is_published": 1}
		if category:
			filters["category"] = category
		
		faqs = frappe.get_all(
			"iWEX FAQ",
			filters=filters,
			fields=["name", "category", "question", "answer", "display_order"],
			order_by="display_order asc"
		)
		
		# Group FAQs by category
		grouped_faqs = {}
		for faq in faqs:
			cat = faq.get("category", "General")
			if cat not in grouped_faqs:
				grouped_faqs[cat] = []
			grouped_faqs[cat].append(faq)
		
		return {
			"success": True,
			"data": {
				"faqs": faqs,
				"grouped": grouped_faqs,
				"categories": list(grouped_faqs.keys())
			}
		}
	except Exception as e:
		frappe.log_error(f"Error fetching FAQs: {str(e)}")
		return {
			"success": False,
			"message": _("Error fetching FAQs")
		}

@frappe.whitelist(allow_guest=True)
def get_testimonials():
	"""
	Get all published testimonials
	"""
	try:
		testimonials = frappe.get_all(
			"iWEX Testimonial",
			filters={"is_published": 1},
			fields=[
				"name",
				"client_name",
				"company",
				"designation",
				"testimonial_text",
				"rating",
				"client_image",
				"image_alt",
				"display_order"
			],
			order_by="display_order asc"
		)
		
		return {
			"success": True,
			"data": testimonials
		}
	except Exception as e:
		frappe.log_error(f"Error fetching testimonials: {str(e)}")
		return {
			"success": False,
			"message": _("Error fetching testimonials")
		}

@frappe.whitelist(allow_guest=True, methods=['POST'])
def submit_contact_form():
	"""
	Submit contact form and create a Lead in ERPNext
	"""
	try:
		# Get form data from request
		if frappe.request.method == "POST":
			data = json.loads(frappe.request.data)
			full_name = data.get('full_name')
			email = data.get('email')
			phone = data.get('phone')
			subject = data.get('subject')
			message = data.get('message')
		else:
			# Fallback to form parameters
			full_name = frappe.form_dict.get('full_name')
			email = frappe.form_dict.get('email')
			phone = frappe.form_dict.get('phone')
			subject = frappe.form_dict.get('subject')
			message = frappe.form_dict.get('message')
		
		# Validate required fields
		if not full_name or not email:
			return {
				"success": False,
				"message": _("Name and email are required")
			}
		
		# Validate email format
		if not frappe.utils.validate_email_address(email):
			return {
				"success": False,
				"message": _("Invalid email address")
			}
		
		# Create Lead
		lead = frappe.get_doc({
			"doctype": "Lead",
			"lead_name": full_name,
			"email_id": email,
			"phone": phone or "",
			"source": "Website",
			"status": "Lead",
			"company_name": subject or "Website Inquiry"
		})
		
		lead.insert(ignore_permissions=True)
		
		# Create Communication/Note with the message
		if message:
			comm = frappe.get_doc({
				"doctype": "Communication",
				"communication_type": "Communication",
				"communication_medium": "Website",
				"subject": subject or "Website Contact Form",
				"content": message,
				"reference_doctype": "Lead",
				"reference_name": lead.name,
				"sender": email,
				"sender_full_name": full_name
			})
			comm.insert(ignore_permissions=True)
		
		# Send email notification to admin
		try:
			recipients = frappe.db.get_single_value("iWEX Website Settings", "contact_email") or "emails@iwex.in"
			frappe.sendmail(
				recipients=recipients,
				subject=f"New Contact Form Submission: {subject or 'Website Inquiry'}",
				message=f"""
					<h3>New Contact Form Submission</h3>
					<p><strong>Name:</strong> {full_name}</p>
					<p><strong>Email:</strong> {email}</p>
					<p><strong>Phone:</strong> {phone or 'Not provided'}</p>
					<p><strong>Subject:</strong> {subject or 'Not provided'}</p>
					<p><strong>Message:</strong></p>
					<p>{message or 'No message provided'}</p>
					<p><a href="{frappe.utils.get_url()}/app/lead/{lead.name}">View Lead</a></p>
				"""
			)
		except Exception as email_error:
			frappe.log_error(f"Error sending notification email: {str(email_error)}")
		
		return {
			"success": True,
			"message": _("Thank you for contacting us! We will get back to you soon."),
			"lead_id": lead.name
		}
		
	except Exception as e:
		frappe.log_error(f"Error submitting contact form: {str(e)}")
		return {
			"success": False,
			"message": _("An error occurred while submitting the form. Please try again later.")
		}

@frappe.whitelist(allow_guest=True)
def subscribe_newsletter(email):
	"""
	Subscribe to newsletter
	"""
	try:
		# Validate email
		if not email or not frappe.utils.validate_email_address(email):
			return {
				"success": False,
				"message": _("Invalid email address")
			}
		
		# Check if already subscribed
		if frappe.db.exists("Email Group Member", {"email": email, "email_group": "Newsletter"}):
			return {
				"success": False,
				"message": _("You are already subscribed to our newsletter")
			}
		
		# Create newsletter subscription
		# First ensure Newsletter group exists
		if not frappe.db.exists("Email Group", "Newsletter"):
			newsletter_group = frappe.get_doc({
				"doctype": "Email Group",
				"title": "Newsletter"
			})
			newsletter_group.insert(ignore_permissions=True)
		
		# Add subscriber
		subscriber = frappe.get_doc({
			"doctype": "Email Group Member",
			"email_group": "Newsletter",
			"email": email
		})
		subscriber.insert(ignore_permissions=True)
		
		return {
			"success": True,
			"message": _("Successfully subscribed to newsletter!")
		}
		
	except Exception as e:
		frappe.log_error(f"Error subscribing to newsletter: {str(e)}")
		return {
			"success": False,
			"message": _("An error occurred. Please try again later.")
		}

@frappe.whitelist(allow_guest=True)
def get_categories():
	"""
	Get all FAQ categories
	"""
	try:
		# Get unique categories from FAQ doctype
		categories = frappe.db.sql("""
			SELECT DISTINCT category
			FROM `tabiWEX FAQ`
			WHERE is_published = 1
			ORDER BY category
		""", as_dict=True)
		
		return {
			"success": True,
			"data": [cat.category for cat in categories]
		}
	except Exception as e:
		frappe.log_error(f"Error fetching categories: {str(e)}")
		return {
			"success": False,
			"message": _("Error fetching categories")
		}

@frappe.whitelist(allow_guest=True)
def get_client_logos():
	"""
	Get client logos from Customer DocType
	"""
	try:
		# Get settings
		settings = None
		if frappe.db.exists("iWEX Website Settings", "iWEX Website Settings"):
			settings = frappe.get_doc("iWEX Website Settings", "iWEX Website Settings")
		
		# Check if client logos are enabled
		if settings and not settings.show_client_logos:
			return {
				"success": True,
				"data": []
			}
		
		# Get max logos to display
		max_logos = settings.max_client_logos if settings else 12
		
		# Build filter
		filters = {"disabled": 0}
		
		# Get customers with images
		customers = frappe.get_all(
			"Customer",
			filters=filters,
			fields=["name", "customer_name", "image"],
			limit=max_logos,
			order_by="modified desc"
		)
		
		# Filter only customers with images
		client_logos = [
			{
				"name": customer.name,
				"customer_name": customer.customer_name,
				"logo": customer.image
			}
			for customer in customers if customer.image
		]
		
		return {
			"success": True,
			"data": client_logos[:max_logos]
		}
		
	except Exception as e:
		frappe.log_error(f"Error fetching client logos: {str(e)}")
		return {
			"success": False,
			"message": _("Error fetching client logos")
		}

