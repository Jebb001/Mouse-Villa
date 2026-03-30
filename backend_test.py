import requests
import sys
from datetime import datetime
import json

class VillaKephalaAPITester:
    def __init__(self, base_url="https://cycladic-retreat.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            print(f"   Status Code: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:500]}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "",
            200
        )
        return success

    def test_status_check_post(self):
        """Test creating a status check"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )
        
        if success and isinstance(response, dict):
            # Verify response structure
            required_fields = ['id', 'client_name', 'timestamp']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing field in response: {field}")
                    return False
            print(f"✅ Status check created with ID: {response.get('id', 'N/A')}")
        
        return success

    def test_status_check_get(self):
        """Test getting status checks"""
        success, response = self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} status checks")
        
        return success

    def test_contact_form_submission(self):
        """Test contact form submission with valid data"""
        test_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "+1234567890",
            "dates": "July 15-22, 2025",
            "guests": "4",
            "message": "Interested in booking the villa for a family vacation."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )
        
        if success and isinstance(response, dict):
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'created_at']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing field in response: {field}")
                    return False
            print(f"✅ Contact inquiry created with ID: {response.get('id', 'N/A')}")
        
        return success

    def test_contact_form_validation(self):
        """Test contact form validation with missing required fields"""
        # Test missing name
        test_data = {
            "email": "test@example.com"
        }
        
        success, response = self.run_test(
            "Contact Form - Missing Name",
            "POST",
            "contact",
            422,  # Validation error
            data=test_data
        )
        
        # Test missing email
        test_data = {
            "name": "Test User"
        }
        
        success2, response2 = self.run_test(
            "Contact Form - Missing Email",
            "POST",
            "contact",
            422,  # Validation error
            data=test_data
        )
        
        # Test invalid email
        test_data = {
            "name": "Test User",
            "email": "invalid-email"
        }
        
        success3, response3 = self.run_test(
            "Contact Form - Invalid Email",
            "POST",
            "contact",
            422,  # Validation error
            data=test_data
        )
        
        return success and success2 and success3

    def test_get_contact_inquiries(self):
        """Test getting contact inquiries"""
        success, response = self.run_test(
            "Get Contact Inquiries",
            "GET",
            "contact",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} contact inquiries")
        
        return success

def main():
    print("🏛️ Villa Kephala API Testing Suite")
    print("=" * 50)
    
    # Setup
    tester = VillaKephalaAPITester()
    
    # Run tests
    tests = [
        tester.test_api_root,
        tester.test_status_check_post,
        tester.test_status_check_get,
        tester.test_contact_form_submission,
        tester.test_contact_form_validation,
        tester.test_get_contact_inquiries,
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test {test.__name__} failed with exception: {str(e)}")
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Backend API Test Results:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "No tests run")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend tests passed!")
        return 0
    else:
        print("⚠️  Some backend tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())