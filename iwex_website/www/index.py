import frappe

def get_context(context):
	"""
	Context for the iWEX Website landing page
	"""
	context.no_cache = 1
	
	# Set page title and meta
	context.title = "iWEX Infomatics - Innovative Web Solutions"
	context.description = "Leading provider of innovative web solutions and digital transformation services"
	
	return context

