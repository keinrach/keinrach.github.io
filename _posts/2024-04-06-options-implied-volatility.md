---
title: Calculate Options Implied Volatility
categories:
- Equity Market
excerpt: A user friendly interface to calculate implied volatility of options, which are usually not readily available on public sites
feature_text: Calculator of Implied Volatility
feature_image: "https://picsum.photos/2560/600?image=733"
image: "https://picsum.photos/2560/600?image=733"
---



{% include calculator.html %}
<script src="{{ '/assets/scripts/ivCalculator.js' | relative_url }}"></script>

### Visions (to be gradually built)
- User-friendly interface
- Automated risk free rate calculation from SOFR
- Have dividends and American features
- Calculate historical quantitle of IV
- Build volatility smile (rustic version)

### Motivations
Back to the good old days, I still had access to Bloomberg and the bank's internal pricing software. I did not give much thought to how priviledged I was to have accurate calculations and nice visualizations of the volatility surface readily available. 

As I came back to be a retail investor, my needs shifted to having an ok view of implied volatility without seeing bombarding Google ads. Thus, I decide to reinvent the wheels (only the basic part).