import Link from "next/link";
import { Logo } from "@/components/logo";
import {Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-love-light border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo withTagline={true} />
            <p className="text-gray-600 text-sm mt-4">
              A self-service disaster relief coordination platform empowering
              communities to unite during times of need.
            </p>
            
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-600 hover:text-primary"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-gray-600 hover:text-primary"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/disaster-preparedness"
                  className="text-gray-600 hover:text-primary"
                >
                  Disaster Preparedness
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer-guide"
                  className="text-gray-600 hover:text-primary"
                >
                  Volunteer Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/coordination-tips"
                  className="text-gray-600 hover:text-primary"
                >
                  Coordination Tips
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-600 hover:text-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-600 hover:text-primary"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Kutumbakam. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-4 md:mt-0 flex items-center">
            Made with <Heart size={14} className="mx-1 text-love fill-love" />{" "}
            in India
          </p>
        </div>
      </div>
    </footer>
  );
}
