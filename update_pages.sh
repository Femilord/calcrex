#!/bin/bash

# Update Electricity page
cat > /tmp/electricity_intro.txt << 'INTRO'
            <div class="intro-content" id="introContent">
                <p class="intro-text">
                    Master electrical and electronics calculations with CalcREX's comprehensive suite of calculators.
                    From Ohm's Law and power calculations to impedance, resonance, transistor biasing, and digital logic,
                    our tools provide instant, accurate solutions for students, hobbyists, engineers, and professionals.
                    Each calculator includes circuit diagrams, formulas, and practical applications.
                </p>
                <p class="intro-text intro-text-extra">
                    Our electronics calculators cover AC/DC circuits, power electronics, digital systems, and component 
                    calculations. Whether you're designing circuits, troubleshooting electronics, or studying for 
                    certification exams, CalcREX provides reliable tools with clear explanations. All calculators work 
                    on any device and are completely free to use with no registration required.
                </p>
            </div>
INTRO

# Update Computer Science page
cat > /tmp/cs_intro.txt << 'INTRO'
            <div class="intro-content" id="introContent">
                <p class="intro-text">
                    Master computer science calculations with CalcREX's comprehensive suite of calculators. From binary
                    conversions and data structures to algorithms, networking, cryptography, and performance analysis,
                    our tools provide instant, accurate solutions for students, developers, system administrators, and
                    IT professionals. Each calculator includes examples, explanations, and real-world applications.
                </p>
                <p class="intro-text intro-text-extra">
                    Our computer science calculators handle everything from basic number system conversions to complex 
                    algorithm analysis, network subnetting, and encryption computations. Perfect for coding interviews, 
                    system design, performance optimization, or learning fundamental CS concepts. All tools are 
                    mobile-friendly and completely free without any registration.
                </p>
            </div>
INTRO

# Update Finance page
cat > /tmp/finance_intro.txt << 'INTRO'
            <div class="intro-content" id="introContent">
                <p class="intro-text">
                    Master financial calculations with CalcREX's comprehensive suite of finance calculators. From loan
                    amortization and investment returns to retirement planning, mortgage calculations, and business
                    metrics, our tools provide instant, accurate solutions for personal finance, business planning, and
                    investment analysis. Each calculator includes formulas, breakdowns, and practical insights.
                </p>
                <p class="intro-text intro-text-extra">
                    Our finance calculators cover everything from simple interest to complex investment portfolios, 
                    tax planning, and business valuation. Whether you're planning for retirement, analyzing investments, 
                    comparing loans, or managing business finances, CalcREX provides professional-grade tools with 
                    clear explanations. All calculators are free to use on any device with no registration required.
                </p>
            </div>
INTRO

# Update Date & Time page
cat > /tmp/datetime_intro.txt << 'INTRO'
            <div class="intro-content" id="introContent">
                <p class="intro-text">
                    Master date and time calculations with CalcREX's comprehensive suite of calculators. From age
                    calculations and date differences to business days, time zones, and calendar utilities, our tools
                    provide instant, accurate solutions for personal planning, project management, and scheduling. Each
                    calculator handles complex scenarios with precision and ease.
                </p>
                <p class="intro-text intro-text-extra">
                    Our date & time calculators handle everything from simple age calculations to complex business day 
                    computations, timezone conversions, and calendar analysis. Perfect for event planning, project 
                    scheduling, deadline tracking, or simply satisfying curiosity about dates and durations. All tools 
                    work seamlessly on any device and are completely free without registration.
                </p>
            </div>
INTRO

# Update Converters page
cat > /tmp/converters_intro.txt << 'INTRO'
            <div class="intro-content" id="introContent">
                <p class="intro-text">
                    Master unit conversions with CalcREX's comprehensive suite of converters. From length and weight to
                    temperature, speed, energy, and data storage, our tools provide instant, accurate conversions across
                    12 major categories with over 100 different units. Perfect for students, professionals, travelers,
                    and anyone needing quick and reliable unit conversions.
                </p>
                <p class="intro-text intro-text-extra">
                    Our unit converters handle everything from metric to imperial, scientific to everyday units, with 
                    precision and ease. Whether you're cooking, traveling, studying, or working on technical projects, 
                    CalcREX provides the conversion tools you need. All converters are mobile-friendly, completely free, 
                    and require no registration or installation.
                </p>
            </div>
INTRO

echo "Intro files created successfully!"
