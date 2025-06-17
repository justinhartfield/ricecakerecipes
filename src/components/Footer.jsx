import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Heart, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Recipes",
      links: [
        { name: "Savory Rice Cakes", path: "/category/savory" },
        { name: "Dessert Rice Cakes", path: "/category/dessert" },
        { name: "Ethnic & International", path: "/category/ethnic" },
        { name: "High-Protein & Low-Cal", path: "/category/healthy" }
      ]
    },
    {
      title: "About",
      links: [
        { name: "Our Story", path: "/about" },
        { name: "Recipe Guidelines", path: "/about#guidelines" },
        { name: "Nutrition Info", path: "/about#nutrition" },
        { name: "Contact Us", path: "/about#contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Cooking Tips", path: "/tips" },
        { name: "Ingredient Guide", path: "/ingredients" },
        { name: "Kitchen Tools", path: "/tools" },
        { name: "Recipe Submissions", path: "/submit" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@ricecakerecipes.com", label: "Email" }
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-2 bg-primary rounded-full"
              >
                <ChefHat className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold gradient-text">Rice Cake Recipes</h3>
                <p className="text-xs text-muted-foreground">Delicious & Healthy</p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Discover amazing rice cake recipes from around the world. From savory Korean tteokbokki to sweet tropical desserts, we've got your cravings covered.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for food lovers</span>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-primary/5 rounded-lg p-6 mb-8"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Stay Updated with New Recipes</h3>
            <p className="text-muted-foreground mb-4">
              Get the latest rice cake recipes and cooking tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Rice Cake Recipes. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-border">
          <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
            Terms of Service
          </Link>
          <Link to="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
            Cookie Policy
          </Link>
          <Link to="/sitemap" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

