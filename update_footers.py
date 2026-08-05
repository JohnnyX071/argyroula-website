import os
import re
import glob

eng_footer_template = '''    <!-- ################# Footer Starts Here #######################--->
    <footer class="footer">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-4 col-sm-12 footer-section">
            <h2 class="footer-heading">About Me</h2>
            <p class="footer-text">
              I am a Full Professor of Clinical Psychology in the Department of Social Work at Hellenic Mediterranean University (HMU). I am leading the HMU’s Gender Equality and Combating Discrimination Committee, and I am a member of the Quality-of-Life Lab, the Steering Committee and the Programme Committee of the postgraduate program "Interdisciplinary Management of Chronic Diseases, Disability, and Ageing".
            </p>
          </div>

          <div class="col-md-4 col-sm-12 footer-section">
            <h2 class="footer-heading">Quick Links</h2>
            <ul class="footer-menu">
              <li><a href="{prefix}about_me.html" class="menu-link">About Me</a></li>
              <li><a href="{prefix}theory.html" class="menu-link">Theory</a></li>
              <li><a href="{prefix}questionnaires.html" class="menu-link">Questionnaires</a></li>
              <li><a href="{prefix}publications.html" class="menu-link">Publications</a></li>
              <li><a href="{prefix}gallery.html" class="menu-link">Gallery</a></li>
            </ul>
          </div>

          <div class="col-md-4 col-sm-12 footer-section">
            <h2 class="footer-heading">Contact Information</h2>
            <address class="footer-contact">
              <div class="contact-item">
                <i class="fas fa-map-marker-alt contact-icon"></i>
                <span class="contact-text">Department of Social Work, School of Health Sciences, Hellenic Mediterranean University, Estavromenos</span>
              </div>
              <div class="contact-item">
                <i class="fa-solid fa-box contact-icon"></i>
                <span class="contact-text">P.O. Box: 1939, Heraklion 71410, Crete</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone contact-icon"></i>
                <span class="contact-text">2810-379551 (office)</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope contact-icon"></i>
                <a href="mailto:akalaitzaki@hmu.gr" class="contact-link">akalaitzaki@hmu.gr</a>
              </div>
            </address>
          </div>
        </div>
      </div>
    </footer>

    <div class="copyright">
      <div class="container">
        <div class="copyright-content">
          <div>
            <span class="copyright-text">&copy; 2025-2026 Argyroula Kalaitzaki</span><br />
            <span class="made-by" style="font-size: 0.9em; color: #aaa">Made by John Xanthos</span>
          </div>
          <div class="social-links">
            <a href="https://scholar.google.com/citations?hl=en&user=CmYhEE4AAAAJ" target="_blank" class="social-link" aria-label="Google Scholar">
              <i class="fa-brands fa-google-scholar"></i>
            </a>
            <a href="https://www.researchgate.net/profile/Argyroula_Kalaitzaki" target="_blank" class="social-link" aria-label="ResearchGate">
              <i class="fa-brands fa-researchgate"></i>
            </a>
            <a href="https://www.linkedin.com/in/kalaitzaki-argyroula-93425641" target="_blank" class="social-link" aria-label="LinkedIn">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://www.facebook.com/Argyroula.Kalaitzaki" target="_blank" class="social-link" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/argyroula_kalaitzaki" target="_blank" class="social-link" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
'''

gr_footer_template = '''    <!-- ################# Footer Starts Here #######################--->
    <footer class="footer">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-4 col-sm-12 footer-section">
            <h2 class="footer-heading">Σχετικά με εμένα</h2>
            <p class="footer-text">
              Είμαι Τακτική Καθηγήτρια Κλινικής Ψυχολογίας στο Τμήμα Κοινωνικής Εργασίας του Ελληνικού Μεσογειακού Πανεπιστημίου (ΕΛΜΕΠΑ). Είμαι Επικεφαλής της Επιτροπής Ισότητας Φύλων και Καταπολέμησης των Διακρίσεων του ΕΛΜΕΠΑ, και μέλος του Εργαστηρίου Ποιότητας Ζωής, της Συντονιστικής Επιτροπής και της Επιτροπής Προγράμματος Σπουδών του μεταπτυχιακού προγράμματος «Διεπιστημονική Διαχείριση Χρόνιων Νοσημάτων, Αναπηρίας και Γήρανσης».
            </p>
          </div>

          <div class="col-md-4 col-sm-12 footer-section">
            <h2 class="footer-heading">Γρήγοροι Σύνδεσμοι</h2>
            <ul class="footer-menu">
              <li><a href="{prefix}about_me.html" class="menu-link">Σχετικά με εμένα</a></li>
              <li><a href="{prefix}theory.html" class="menu-link">Θεωρία</a></li>
              <li><a href="{prefix}questionnaires.html" class="menu-link">Ερωτηματολόγια</a></li>
              <li><a href="{prefix}publications.html" class="menu-link">Δημοσιεύσεις</a></li>
              <li><a href="{prefix}gallery.html" class="menu-link">Γκαλερί</a></li>
            </ul>
          </div>

          <div class="col-md-4 col-sm-12 footer-section">
            <h2 class="footer-heading">Στοιχεία Επικοινωνίας</h2>
            <address class="footer-contact">
              <div class="contact-item">
                <i class="fas fa-map-marker-alt contact-icon"></i>
                <span class="contact-text">Τμήμα Κοινωνικής Εργασίας, Σχολή Επιστημών Υγείας, Ελληνικό Μεσογειακό Πανεπιστήμιο, Εσταυρωμένος</span>
              </div>
              <div class="contact-item">
                <i class="fa-solid fa-box contact-icon"></i>
                <span class="contact-text">Τ.Θ. 1939, Ηράκλειο 71410, Κρήτη</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone contact-icon"></i>
                <span class="contact-text">2810-379551 (γραφείο)</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope contact-icon"></i>
                <a href="mailto:akalaitzaki@hmu.gr" class="contact-link">akalaitzaki@hmu.gr</a>
              </div>
            </address>
          </div>
        </div>
      </div>
    </footer>

    <div class="copyright">
      <div class="container">
        <div class="copyright-content">
          <div>
            <span class="copyright-text">&copy; 2025-2026 Αργυρούλα Καλαϊτζάκη</span><br />
            <span class="made-by" style="font-size: 0.9em; color: #aaa">Κατασκευή: John Xanthos</span>
          </div>
          <div class="social-links">
            <a href="https://scholar.google.com/citations?hl=en&user=CmYhEE4AAAAJ" target="_blank" class="social-link" aria-label="Google Scholar">
              <i class="fa-brands fa-google-scholar"></i>
            </a>
            <a href="https://www.researchgate.net/profile/Argyroula_Kalaitzaki" target="_blank" class="social-link" aria-label="ResearchGate">
              <i class="fa-brands fa-researchgate"></i>
            </a>
            <a href="https://www.linkedin.com/in/kalaitzaki-argyroula-93425641" target="_blank" class="social-link" aria-label="LinkedIn">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://www.facebook.com/Argyroula.Kalaitzaki" target="_blank" class="social-link" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/argyroula_kalaitzaki" target="_blank" class="social-link" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
'''

files = []
files.extend(glob.glob('*.html'))
files.extend(glob.glob('assets/html_eng/*.html'))
files.extend(glob.glob('assets/html_gr/*.html'))

footer_regex_1 = re.compile(r'<!-- ################# Footer Starts Here #######################--->.*?<div class="copyright">.*?</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)
footer_regex_2 = re.compile(r'<footer class="footer">.*?<div class="copyright">.*?</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)
script_insert_regex = re.compile(r'(?=\s*<script src="(\.\./)?assets/js/jquery|(?:\s*<script src="(?:\.\./)?js/jquery))')

for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    prefix = ""
    template = eng_footer_template

    if 'index.html' in path:
        prefix = "assets/html_eng/"
        template = eng_footer_template
    elif 'index_gr.html' in path:
        prefix = "assets/html_gr/"
        template = gr_footer_template
    elif 'html_eng' in path:
        prefix = ""
        template = eng_footer_template
    elif 'html_gr' in path:
        prefix = ""
        template = gr_footer_template

    replacement = template.replace('{prefix}', prefix)

    # Try matching existing footer
    new_content, count = footer_regex_1.subn(replacement, content)
    if count == 0:
        new_content, count = footer_regex_2.subn(replacement, content)

    if count == 0:
        # Footer doesn't exist, we must inject it right before <script src=... jquery 
        # (Looking at theory.html, it's <script src="../js/jquery-3.2.1.min.js"></script>)
        match = script_insert_regex.search(content)
        if match:
            pos = match.start()
            new_content = content[:pos] + "\n" + replacement + "\n" + content[pos:]
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Inserted footer into {path}")
        else:
            print(f"Could not find insert point in {path}")
    else:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Replaced footer in {path}")
