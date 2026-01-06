---
layout: default
title: "About"
description: "About Devon Tyler — background, principles, and how to connect."
permalink: /about/
---

<section class="container">
  <div class="section__head">
    <h1 class="section__title">About</h1>
    <p class="section__blurb">A short overview—kept factual and privacy-forward.</p>
  </div>

  <div class="panel">
    <p>
      I’m {{ site.data.profile.name }}, based in {{ site.data.profile.location }}.
      This site is a public hub that points to active work and lightweight demos.
    </p>

    <h2 class="section__title" style="margin-top:18px;">Operating principles</h2>
    <ul>
      <li><strong>Clarity:</strong> plain-language descriptions, no hype.</li>
      <li><strong>Separation:</strong> distinct categories for business, mission, tools, and ideas.</li>
      <li><strong>Privacy:</strong> no publication of private repositories, filings, or evidence assets.</li>
      <li><strong>Integrity:</strong> factual claims only; corrections welcomed.</li>
    </ul>

<h2 class="section__title" style="margin-top:18px;">What I build</h2>
<ul>
  <li><strong>Practical systems:</strong> tools that reduce friction and make work easier to ship.</li>
  <li><strong>Field-ready execution:</strong> real-world workflows, documentation, and operational reliability.</li>
  <li><strong>Simple, durable web:</strong> fast static sites and small utilities with minimal dependencies.</li>
</ul>

<h2 class="section__title" style="margin-top:18px;">What I don’t do</h2>
<ul>
  <li><strong>No hype:</strong> I avoid inflated claims, fake metrics, or implied endorsements.</li>
  <li><strong>No private leakage:</strong> I do not publish private repo contents, sensitive materials, or evidence assets here.</li>
  <li><strong>No inflammatory framing:</strong> I keep language neutral and stick to verifiable facts.</li>
</ul>


    <h2 class="section__title" style="margin-top:18px;">Contact</h2>
    <p class="muted">
      Add your preferred contact methods in <code>/_data/profile.yml</code> under <code>social</code>.
    </p>

    {% include social-icons.html %}
  </div>
</section>
