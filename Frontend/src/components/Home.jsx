import React from 'react'
import { NavLink } from 'react-router'
import {
  pageBackground,
  pageWrapper,
  pageTitleClass,
  bodyText,
  primaryBtn,
  secondaryBtn,
  cardClass,
  headingClass,
  subHeadingClass,
  dividerOrnament,
  pullquoteClass
} from '../styles/common'

function Home() {
  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className={`${pageTitleClass} mb-6`}>
            Welcome to Literary Journal
          </h1>
          <p className={`${bodyText} text-xl max-w-2xl mx-auto mb-8 leading-relaxed`}>
            A curated space where words come alive. Discover compelling stories,
            insightful essays, and the voices that shape our literary landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink to="/articles" className={primaryBtn}>
              Explore Articles
            </NavLink>
            <NavLink to="/register" className={secondaryBtn}>
              Join Our Community
            </NavLink>
          </div>
        </section>

        {/* Pullquote */}
        <blockquote className={`${pullquoteClass} my-16`}>
          "The more that you read, the more things you will know. The more that you learn,
          the more places you'll go." — Dr. Seuss
        </blockquote>

        {/* Features Section */}
        <section className="py-16">
          <h2 className={`${headingClass} text-center mb-12`}>
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${cardClass} text-center`}>
              <div className="mb-4">
                <div className="w-12 h-12 bg-[#c0392b]/10 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#c0392b] text-xl">📖</span>
                </div>
                <h3 className={`${subHeadingClass} mb-3`}>
                  Curated Content
                </h3>
                <p className={bodyText}>
                  Carefully selected articles that inspire, educate, and entertain.
                  From personal essays to investigative journalism.
                </p>
              </div>
            </div>

            <div className={`${cardClass} text-center`}>
              <div className="mb-4">
                <div className="w-12 h-12 bg-[#c0392b]/10 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#c0392b] text-xl">✍️</span>
                </div>
                <h3 className={`${subHeadingClass} mb-3`}>
                  Author Community
                </h3>
                <p className={bodyText}>
                  Join a community of passionate writers and readers. Share your voice
                  and connect with fellow literary enthusiasts.
                </p>
              </div>
            </div>

            <div className={`${cardClass} text-center`}>
              <div className="mb-4">
                <div className="w-12 h-12 bg-[#c0392b]/10 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#c0392b] text-xl">🌟</span>
                </div>
                <h3 className={`${subHeadingClass} mb-3`}>
                  Quality First
                </h3>
                <p className={bodyText}>
                  We believe in the power of well-crafted words. Every piece is reviewed
                  to ensure it meets our standards of excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className={dividerOrnament}>Begin Your Journey</div>

          <div className="max-w-xl mx-auto mt-8">
            <h3 className={`${headingClass} mb-4`}>
              Ready to Start Reading?
            </h3>
            <p className={`${bodyText} mb-6`}>
              Join thousands of readers who discover new perspectives and ideas every day.
            </p>
            <NavLink to="/register" className={primaryBtn}>
              Create Your Account
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home