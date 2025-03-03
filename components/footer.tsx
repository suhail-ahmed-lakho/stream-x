import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold text-steam-red">
                STEAM<span className="text-white">X</span>
              </span>
            </Link>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/movies" className="hover:text-white transition-colors">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/tv-shows" className="hover:text-white transition-colors">
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link href="/new" className="hover:text-white transition-colors">
                    New & Popular
                  </Link>
                </li>
                <li>
                  <Link href="/my-list" className="hover:text-white transition-colors">
                    My List
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/devices" className="hover:text-white transition-colors">
                    Supported Devices
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white transition-colors">
                    Cookie Preferences
                  </Link>
                </li>
                <li>
                  <Link href="/corporate" className="hover:text-white transition-colors">
                    Corporate Information
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/account" className="hover:text-white transition-colors">
                    Account
                  </Link>
                </li>
                <li>
                  <Link href="/subscription" className="hover:text-white transition-colors">
                    Subscription
                  </Link>
                </li>
                <li>
                  <Link href="/gift" className="hover:text-white transition-colors">
                    Gift Cards
                  </Link>
                </li>
                <li>
                  <Link href="/redeem" className="hover:text-white transition-colors">
                    Redeem Gift
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-sm">
          <p>&copy; {new Date().getFullYear()} Steam X. All rights reserved.</p>
          <p className="mt-2">
            Steam X is a demo streaming service. All content shown is for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}

