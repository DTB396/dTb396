---
layout: default
title: "About"
description: "Devon Tyler Barber — NJ Licensed Contractor (HIC #13VH10808800). Verifiable credentials, transparent operations, proven track record."
permalink: /about/
---
<section class="container" style="padding-top: var(--space-section); padding-bottom: var(--space-section);">
  <div class="section__head">
    <h1 class="section__title">About Devon Tyler Barber</h1>
    <p class="section__blurb">Licensed. Verified. Accountable.</p>
  </div>

  <div class="hero__panel" style="max-width: 800px;" data-animate>
    <div class="hero__badge" style="margin-bottom: var(--space-lg);">✓ NJ HIC #13VH10808800 — State Verified</div>
    
    <p style="font-size: var(--text-lg); line-height: 1.7; margin-bottom: var(--space-xl);">
      State-licensed Home Improvement Contractor operating in <strong>Atlantic County, New Jersey</strong>. 
      Background in Engineering with focus on Sustainability. Every claim on this site is verifiable through 
      public records, third-party platforms, or direct documentation.
    </p>

    <!-- Credentials -->
    <h2 class="section__title">Verifiable Credentials</h2>
    <div class="credentials" data-animate-stagger style="margin-bottom: var(--space-xl);">
      {% for cred in site.data.profile.credentials %}
      <div class="credential-card">
        <div class="credential-card__icon">
          {% if cred.type == "License" %}🏛️{% elsif cred.type == "Education" %}🎓{% else %}✓{% endif %}
        </div>
        <div class="credential-card__content">
          <h4>{{ cred.title }}</h4>
          <p>{{ cred.description | default: cred.issuer }}</p>
          {% if cred.number %}
          <span class="credential-card__badge">{{ cred.number }}</span>
          {% endif %}
        </div>
      </div>
      {% endfor %}
    </div>

    <h2 class="section__title">How to Verify</h2>
    <ul class="panel" style="margin-bottom: var(--space-xl);">
      <li><strong>NJ License:</strong> Search <a href="https://newjersey.mylicense.com/verification/" target="_blank" rel="noopener noreferrer">newjersey.mylicense.com</a> for HIC #13VH10808800</li>
      <li><strong>Customer Reviews:</strong> <a href="https://thumbtack.com/nj/absecon/tile/tillerstead-llc/service/547437618353160199" target="_blank" rel="noopener noreferrer">Thumbtack Pro Profile</a></li>
      <li><strong>Public Work:</strong> <a href="https://github.com/DTB396" target="_blank" rel="noopener noreferrer">GitHub Portfolio</a></li>
      <li><strong>Professional Profile:</strong> <a href="https://www.linkedin.com/in/devon-tyler/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
    </ul>

    <h2 class="section__title">Operating Principles</h2>
    <ul class="panel" style="margin-bottom: var(--space-xl);">
      <li><strong>Verify Everything:</strong> Don't trust claims—check them. Every credential listed here is publicly verifiable.</li>
      <li><strong>Quality Work:</strong> TCNA-compliant installations. No shortcuts. Lasting results.</li>
      <li><strong>Transparent Operations:</strong> Clear communication, documented processes, honest assessments.</li>
      <li><strong>Long-term Focus:</strong> Building relationships that last, not chasing quick transactions.</li>
    </ul>

    <h2 class="section__title">Direct Contact</h2>
    <div class="contact-grid" style="margin-bottom: var(--space-xl);">
      <a href="tel:+16098628808" class="contact-card">
        <div class="contact-card__icon">📞</div>
        <div class="contact-card__content">
          <h4>Call Direct</h4>
          <p>(609) 862-8808</p>
        </div>
      </a>
      <a href="mailto:info@Tillerstead.com" class="contact-card">
        <div class="contact-card__icon">✉️</div>
        <div class="contact-card__content">
          <h4>Email</h4>
          <p>info@Tillerstead.com</p>
        </div>
      </a>
      <a href="https://www.linkedin.com/in/devon-tyler/" target="_blank" rel="noopener noreferrer" class="contact-card">
        <div class="contact-card__icon">💼</div>
        <div class="contact-card__content">
          <h4>LinkedIn</h4>
          <p>Professional Profile</p>
        </div>
      </a>
    </div>

    <h2 class="section__title">Connect</h2>
    <div class="hero__social" style="padding-top: var(--space-md);">
      {% include social-icons.html %}
    </div>
  </div>
</section>
