+++
date = "2015-04-06T11:32:58-05:00"
title = "Learning about A/B Testing"
draft = false
showonlyimage = false
image = "/img/blog/ft-ab-testing.jpg"
+++

> Escrito originalmente en español [aquí](http://frontendlabs.io/2435--que-es-ab-testing).

If you are a web designer, front-end developer, project manager or you have a website you might have heard about A/B Testing, in this post I’m going to explain the basics and see some examples to understand what it is about.

## What is A/B Testing?

In simple words, an A/B Test compares two versions of a website and then determines which one produces better results at leading your visitors to one of your goals.

## Why is it called A/B Testing?

Because we are comparing two options:

![ab simple](/img/blog/ab-simple.png)

As we can see in the image above, we have two similar scenarios in which the variable is the button’s color and it changes from blue to red.

The purpose of conducting an A/B test is to deny the null hypothesis. The A/B testing needs to demonstrate with a statistical significance that the **test** is an improvement over the **control** (there are specialized tools that do the job and I list below).

## Why should I test?

We already know about some web standards that work best for the final user (the search bar should be placed at the top of the website, etc…), but what happens when we want to experiment and try new features or there are new ideas that come up and we have no information about the impact they may cause in our users?

When we test one idea against another this will minimize the risk of failure due to simple problems.

The A/B Testing also solves debates, since it avoids reaching wrong conclusions based on assumptions instead of a resolution to the problem with real users and data to back it up.



## Multivariate Testing
![ab multiple](/img/blog/ab-multiple.png)

## Real example of a successful case

### Electronic Arts

**Goal**: To increase revenue

SimCity 5, one of  the most popular EA games, sold 1.1 million copies in the first 2 weeks of its launch. 50% of the pre-orders where digital downloads thanks to a good A/B testing strategy.

<img src="/img/blog/simcity_original.jpg" data-action="zoom">


In the left image we can see the **original proposal**, EA launched a promotional offer to reach more game pre-orders. The offer was displayed in a banner placed at the top of the page. However, according to the team, the promo wasn’t increasing pre-sales as expected, so they decided to test other options to see which design or layout generated more revenue.

In the image at the right we have the **variation**, here the team opted to eliminate the promotional banner off the website. The test brought some surprising results: **the variation with no banner generated 43.4% more orders**. Turns out that people just wanted to buy the game without the extra incentives.

The A/B testing gave EA the information needed to maximize revenue in a very effective way.


## Getting ready for the tests

We want to start thinking about what we want to achieve. You can’t compare without analyzing and understanding the analytics first, this will be useful to identify the problematic areas (users are not registering, they abandon the shopping process, etc.).

AB variations are not chosen randomly, we need to take our time to consider the problem by interviewing users, testing, etc. You have to know your audience to know who you are targeting and what your users want and need.

## What to test?

We have to prioritize the tests, this will depend on your goals. For example, if you want to increase the registration number, you could test the registration form length, the fields type, the way your privacy policy are showing, etc. The goal here is to find what is keeping your users from registering to your website. You can solve this by testing the appropriate elements on your site.

Even though each A/B test is unique, there are certain elements that are usually tested:

* Layout and website style
* Titles or product description
* Form length and field types
* Product prices and promo offers
* Text amount on the page (long vs. short)
* Call to action buttons, size, position, color, wording, etc.
* Images in landing pages or product pages

## Start creating your tests

Popular testing services:

* [Optimizely](https://www.optimizely.com/) (popular, cheap and with a free basic plan option)
* [Visual Website Optimizer](https://vwo.com/) (A/B Testing software for marketers)
* [Google Content Experiments](https://support.google.com/analytics/answer/1745149) (free)
* [A/Bingo](https://www.bingocardcreator.com/abingo), [Vanity](http://vanity.labnotes.org/) (Ruby on Rails)
* [Unbounce](http://unbounce.com/) (specialized in landing pages)
* [convert.com](http://www.convert.com/)
* [KISSmetrics](https://www.kissmetrics.com/)
* [Maxymiser](https://www.maxymiser.com/)
* [Adobe Target](http://www.adobe.com/la/solutions/testing-targeting.html)

## More useful resources

If you’re just starting with this topic you can get some ideas in the following websites:

* [WhichTestWon](https://whichtestwon.com/)
* [101 a/b testing tips](http://www.conversion-rate-experts.com/cro-tips/)
* [Verify App](http://verifyapp.com/)
* [Crazy Egg](http://www.crazyegg.com/)
* [Hubspot](http://hubspot.com/)
* [Usertesting.com](http://www.usertesting.com/)

If you have more resources or comments don’t forget to share below, I’m always trying to improve and keep on learning!