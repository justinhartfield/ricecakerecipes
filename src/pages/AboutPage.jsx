import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Heart, Users, Award, Globe, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import SEOHead from '../components/SEOHead';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Chef Maria Rodriguez",
      role: "Head Recipe Developer",
      bio: "Specializing in fusion cuisine with 15 years of culinary experience.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Dr. Sarah Kim",
      role: "Nutritionist",
      bio: "PhD in Nutrition Science, focused on healthy, balanced meal planning.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "James Chen",
      role: "Food Photographer",
      bio: "Award-winning food photographer making recipes look irresistible.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const stats = [
    { icon: ChefHat, number: "50+", label: "Tested Recipes" },
    { icon: Users, number: "10K+", label: "Happy Cooks" },
    { icon: Globe, number: "25+", label: "Countries Represented" },
    { icon: Award, number: "4.8", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About Us"
        description="Learn about Rice Cake Recipes - our mission to make healthy, delicious cooking accessible to everyone. Meet our team of culinary experts and nutritionists."
        keywords="about rice cake recipes, healthy cooking, recipe development team, nutrition experts, food photography"
        url="https://ricecakerecipes.com/about"
      />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">Rice Cake Recipes</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're passionate about transforming simple rice cakes into extraordinary culinary experiences. 
              Our mission is to make healthy, delicious cooking accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Rice Cake Recipes was born from a simple observation: rice cakes had incredible potential 
                  that was largely untapped. What started as a personal quest to make healthy eating more 
                  exciting has grown into a comprehensive resource for food lovers worldwide.
                </p>
                <p>
                  Our founder, inspired by travels across Asia and a passion for nutritious cooking, 
                  began experimenting with rice cake recipes in 2020. From Korean tteokbokki to Japanese 
                  mochi-inspired desserts, we discovered that rice cakes could be the foundation for 
                  incredible dishes from every cuisine.
                </p>
                <p>
                  Today, we're proud to offer a curated collection of recipes that celebrate the 
                  versatility of rice cakes while maintaining our commitment to health, flavor, and 
                  cultural authenticity.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                alt="Cooking rice cakes"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              By the <span className="gradient-text">Numbers</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our impact on the rice cake cooking community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              The passionate people behind every recipe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center glass-effect border-0 overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative mb-4"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Mission & Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Health First",
                description: "Every recipe is crafted with nutrition in mind, ensuring you can enjoy delicious food while maintaining a healthy lifestyle."
              },
              {
                icon: Globe,
                title: "Cultural Respect",
                description: "We honor the traditional origins of rice cake dishes while creating innovative fusion recipes that celebrate global flavors."
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Our recipes are tested by real home cooks, and we continuously improve based on feedback from our amazing community."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center glass-effect border-0 h-full">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <value.icon className="h-8 w-8 text-primary-foreground" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have a recipe suggestion? Want to collaborate? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 glass-effect">
                Submit a Recipe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

