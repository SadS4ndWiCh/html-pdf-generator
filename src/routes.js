const router = require('express').Router();
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const path = require('path');

const passengers = [
  {
    name: 'Jonh',
    flightNumber: 4595,
    time: '18h00',
  },
  {
    name: 'Anne',
    flightNumber: 4595,
    time: '18h00',
  },
  {
    name: 'Bety',
    flightNumber: 4595,
    time: '18h00',
  },
]

router.get('/', (req, res) => {
  ejs.renderFile(path.join(__dirname, 'pages', 'reports.ejs'), { passengers }, (err, html) => {
    if(err) {
      console.log(err);
      return res.send('Falha ao carregar página')
    }

    res.send(html);
  });
});

router.get('/pdf', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({
    printBackground: true,
    format: 'letter',
  });

  res.contentType('application/pdf');
  return res.send(pdf);
});

module.exports = router;