# kimchikorelileriniskembesidir

A multi-page static questionnaire / puzzle site.

## Setup

### 1. Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Set source to: `main` branch, root `/`
4. GitHub Pages URL will be `https://<yourgithubusername>.github.io/<reponame>`

### 2. Custom Domain

1. In **Settings → Pages**, add custom domain: `kimchikorelileriniskembesidir.com`
2. At your DNS registrar, add a CNAME record:
   - Name: `kimchikorelileriniskembesidir.com` (or `www`)
   - Value: `<yourgithubusername>.github.io`
3. Wait for DNS propagation (up to 48 hours)

### 3. Fill in placeholders

Search all HTML files for `[YOUR_REVELATION_HERE` and `[YOUR_SINCERE_PARAGRAPH_HERE` and replace with real content:

- `p3.html` — first personal revelation (blockquote)
- `p6.html` — second personal revelation (blockquote)
- `p10.html` — sincere paragraph (no puzzle, just you)
- `p12.html` — third and final revelation (blockquote)

### 4. Cat images

Add four cat images to a `cats/` folder in the repo root:

```
cats/cat1.jpg
cats/cat2.jpg
cats/cat3.jpg
cats/cat4.jpg
```

Famous internet cats work well (Lil Bub, Grumpy Cat, Nyan Cat, etc.) — the questionnaire has an easter egg for recognizing them.

### 5. Anagram word (p5.html)

Open `p5.html` and:
1. Replace the `<span class="scrambled">AELRTT</span>` display with your chosen scrambled word
2. Update the hint text to match your word
3. Change `const CORRECT_ANSWER = 'RATTLE'` to your actual answer (uppercase)

### 6. Google Form submission (p13.html)

1. Create a Google Form with fields for each data point collected
2. Get the form's submit URL: `https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse`
3. Get each field's entry ID (inspect the form HTML or use the prefill link trick)
4. In `p13.html`, replace `FORM_ACTION_URL` with your form's action URL
5. Replace the placeholder entry IDs (`entry.1000000001` etc.) with your real entry IDs

The fields collected are: gate key, difficulty, occupation, age, gender, trolley answer, mersenne answer, cat names, photography preference, personality/hill, contact info, secret found, QWERTY opinion.

## File map

| File | Purpose |
|------|---------|
| `index.html` | Entry point — generates session key, redirects to gate |
| `gate.html` | Welcome + difficulty selector + cookie banner |
| `p1.html` | Puzzle: 2+2 with confirmation modal |
| `p2.html` | CAPTCHA parody: tung tung tung sahur |
| `p3.html` | Exchange #1: occupation |
| `p4.html` | Name the cats |
| `p5.html` | Anagram puzzle |
| `p6.html` | Exchange #2: age + gender |
| `p7.html` | Trolley problem |
| `p8.html` | Mersenne primes |
| `p9.html` | Economics / tax question |
| `p10.html` | Sincere paragraph (no puzzle) |
| `p11.html` | Photography preference |
| `p12.html` | Exchange #3: hill you'll die on |
| `p13.html` | Final page + contact + form submission |
| `secret.html` | Hidden page (reached by clicking the timer) |
| `style.css` | Shared stylesheet |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages |
