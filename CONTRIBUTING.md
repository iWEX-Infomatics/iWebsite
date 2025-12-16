# Contributing to iWEX Website

Thank you for your interest in contributing to the iWEX Website project! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [How to Contribute](#how-to-contribute)
5. [Coding Standards](#coding-standards)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Testing](#testing)
9. [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards others

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/iWEX-Infomatics/iWebsite.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit and push
7. Create a pull request

## Development Setup

### Prerequisites

- ERPNext v15 installed
- Python 3.10+
- Node.js 18+
- Git

### Installation

```bash
# Navigate to your bench directory
cd /path/to/frappe-bench

# Get the app
bench get-app /path/to/iwex_website

# Install on your site
bench --site development.localhost install-app iwex_website

# Start development server
bench start
```

### Development Mode

Enable developer mode in your site:

```bash
bench --site development.localhost set-config developer_mode 1
bench --site development.localhost clear-cache
```

## How to Contribute

### Reporting Bugs

Before creating a bug report:
- Check if the bug has already been reported
- Collect information about the bug
- Test with the latest version

When reporting:
- Use a clear and descriptive title
- Describe the exact steps to reproduce
- Provide specific examples
- Describe the behavior you observed
- Explain what behavior you expected
- Include screenshots if applicable
- Include your environment details

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the proposed feature
- Explain why this enhancement would be useful
- List any alternatives you've considered
- Include mockups or examples if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues for beginners
- `help wanted` - Issues that need attention
- `documentation` - Documentation improvements

## Coding Standards

### Python Code

Follow PEP 8 style guide:

```python
# Good
def get_services():
    """Get all published services."""
    return frappe.get_all("iWEX Service", filters={"is_published": 1})

# Bad
def getServices():
    return frappe.get_all("iWEX Service",filters={"is_published":1})
```

Use type hints where applicable:

```python
def submit_contact_form(full_name: str, email: str, message: str) -> dict:
    """Submit contact form."""
    pass
```

### JavaScript Code

Follow modern JavaScript best practices:

```javascript
// Good
const loadServices = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading services:', error);
    }
};

// Bad
function loadServices() {
    fetch(API_URL).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
}
```

### CSS Code

Use consistent naming and organization:

```css
/* Good */
.service-card {
    padding: 24px;
    border-radius: 12px;
    transition: transform 0.3s ease;
}

.service-card:hover {
    transform: translateY(-8px);
}

/* Bad */
.serviceCard {
    padding:24px;border-radius:12px;transition:transform .3s ease;
}
```

### Vue Components

Follow Vue 3 composition API best practices:

```javascript
// Good
const { createApp } = Vue;

createApp({
    data() {
        return {
            items: [],
            loading: false
        }
    },
    async mounted() {
        await this.loadItems();
    },
    methods: {
        async loadItems() {
            this.loading = true;
            try {
                // Load items
            } finally {
                this.loading = false;
            }
        }
    }
}).mount('#app');
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(services): add service filtering by category

Add ability to filter services by category in the services section.
Includes API endpoint update and frontend implementation.

Closes #123
```

```
fix(contact-form): validate email format correctly

Fix email validation regex to properly handle all valid email formats.

Fixes #456
```

## Pull Request Process

### Before Submitting

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Follow the coding standards
6. Rebase on latest main branch

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] All tests passing

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] CHANGELOG.md updated

## Screenshots (if applicable)

## Related Issues
Closes #issue_number
```

### Review Process

1. At least one maintainer must review
2. All CI checks must pass
3. No merge conflicts
4. Documentation must be updated
5. Tests must pass

## Testing

### Running Tests

```bash
# Run all tests
bench --site development.localhost run-tests --app iwex_website

# Run specific test
bench --site development.localhost run-tests --app iwex_website --module iwex_website.tests.test_api
```

### Writing Tests

```python
import frappe
import unittest

class TestIWEXWebsite(unittest.TestCase):
    def setUp(self):
        # Setup test data
        pass
    
    def test_get_services(self):
        from iwex_website.api.website import get_services
        result = get_services()
        self.assertTrue(result.get('success'))
        self.assertIsInstance(result.get('data'), list)
    
    def tearDown(self):
        # Cleanup
        pass
```

### Manual Testing

Before submitting a PR:
- Test on multiple browsers
- Test on mobile devices
- Test all user flows
- Check console for errors
- Verify accessibility
- Run Lighthouse audit

## Documentation

### Code Documentation

Add docstrings to all functions:

```python
def get_services():
    """
    Get all published services with their features.
    
    Returns:
        dict: Dictionary with success status and list of services
        
    Example:
        >>> result = get_services()
        >>> print(result['success'])
        True
    """
    pass
```

### README Updates

Update README.md when:
- Adding new features
- Changing installation process
- Updating requirements
- Adding new dependencies

### Changelog

Update CHANGELOG.md for every PR:
- Add entry under [Unreleased]
- Use proper formatting
- Include issue/PR numbers
- Describe user-facing changes

## Questions?

Feel free to:
- Open an issue for questions
- Join our community forum
- Email: emails@iwex.in

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute!

