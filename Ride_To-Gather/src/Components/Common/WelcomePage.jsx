import React from "react";
import { Link } from "react-router-dom";
import "../../assets/Css/Common.css";
import { motion } from "framer-motion";
import { WelcomeNavbar } from "./WelcomeNavbar";

export const WelcomePage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const statsVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.8 }
        }
    };

    return (
        <>
            <WelcomeNavbar />
            <div className="landing-page">
                {/* Hero Section */}
                <section className="hero-section">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.h1 
                            className="hero-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            Ride Together
                        </motion.h1>
                        <motion.p 
                            className="hero-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Share rides, save money, and make a difference
                        </motion.p>
                        <motion.div
                            className="cta-buttons"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to="/login" className="cta-button primary">Get Started</Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to="/about" className="cta-button secondary">Learn More</Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <motion.section 
                    className="features-section"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h2 
                        className="section-title"
                        variants={itemVariants}
                    >
                        Why Choose Ride Together?
                    </motion.h2>
                    <div className="features-grid">
                        {[
                            { 
                                icon: "🚗", 
                                title: "Find or Offer Rides",
                                description: "Find or offer rides with ease using our intuitive platform",
                                delay: 0.1
                            },
                            { 
                                icon: "🤝", 
                                title: "Connect & Share",
                                description: "Connect with fellow travelers and share memorable journeys",
                                delay: 0.2
                            },
                            { 
                                icon: "💰", 
                                title: "Reduce Costs",
                                description: "Split travel costs and save on your daily commute",
                                delay: 0.3
                            },
                            { 
                                icon: "🌱", 
                                title: "Go Green",
                                description: "Contribute to a greener environment by reducing emissions",
                                delay: 0.4
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: feature.delay,
                                    ease: "easeOut"
                                }}
                            >
                                <motion.div 
                                    className="feature-icon"
                                    whileHover={{ 
                                        scale: 1.1,
                                        rotate: [0, -10, 10, -10, 0],
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Stats Section */}
                <motion.section 
                    className="stats-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="stats-container"
                        variants={containerVariants}
                    >
                        {[
                            { number: "1000+", label: "Active Users" },
                            { number: "500+", label: "Daily Rides" },
                            { number: "50%", label: "Cost Savings" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="stat-item"
                                variants={statsVariants}
                                whileHover={{ scale: 1.1 }}
                            >
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    {stat.number}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: index * 0.2 + 0.2 }}
                                >
                                    {stat.label}
                                </motion.p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* CTA Section */}
                <motion.section 
                    className="cta-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="cta-content"
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Ready to Start Your Journey?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Join our community today and experience the benefits of shared rides
                        </motion.p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/signup" className="cta-button primary">Sign Up Now</Link>
                        </motion.div>
                    </motion.div>
                </motion.section>
            </div>
        </>
    );
};