<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <SCRIPT language=JavaScript>

<!-- http://www.spacegun.co.uk -->

var message = "**Right button is disabled**";

function rtclickcheck(keyp){ if (navigator.appName == "Netscape" && keyp.which == 3){ alert(message); return false; }

if (navigator.appVersion.indexOf("MSIE") != -1 && event.button == 2) { alert(message); return false; } }

document.onmousedown = rtclickcheck;

</SCRIPT>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sudipto Sarkar Joy</title>
    <link rel="stylesheet" href="css/homePage.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,500;0,600;0,700;0,800;0,900;1,500;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="fontawesome-free-6.1.1-web/css/all.css">
</head>
<body>
    <section class="hero">
        <div class="main-width">
            <header>
                <div class="logo"><i class="fa-solid fa-s"></i></div>
                <nav>
                    <div class="hamb">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <ul class="nav-list">
                        <li><a href="">Home</a></li>
                        <li class="link"><a href="">About</a></li>
                        <li class="link"><a href="">Service</a></li>
                        <li class="link"><a href="php/project.html">Work</a></li>
                        <li class="btn"><a href="https://www.facebook.com/sarkar.joy.142">Contact Me</a></li>
                    </ul>
                </nav>
            </header>
            <div class="container">
                <div class="hero-text">
                    <h3>Hello Everyone!</h3>
                    <h1>I Am <span class ="input"></span></h1>
                    <p>"Life is what how we define it ,so define yourself to define your life"</p>
                    <a href="https://sudiptojoy.apeiroworld.com/php/project.html">My Project</a>
                    
                </div>

                <div class="bottom">
                    <p>© 2022 - Sudipto Sarkar Joy - All Rights Reserved</p>
                </div>
            </div>
        </div>
    </section>
    <!-- About Section -->
<section id="about" class="about-section">
    <div class="main-width">
        <h2>About Me</h2>
        <div class="about-content">
            <div class="about-text">
                <p>Hello! I'm Sudipto Sarkar Joy, a passionate web developer and designer with expertise in creating modern, responsive websites. I specialize in HTML, CSS, JavaScript, and more. I love solving problems and building user-friendly interfaces.</p>
                <p>When I'm not coding, you can find me exploring new technologies, working on personal projects, or enjoying a good cup of coffee.</p>
                <a href="#contact" class="btn">Get in Touch</a>
            </div>
            <div class="about-image">
                <img src="../img/matro-time.jpg" alt="Sudipto Sarkar Joy">
            </div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="contact-section">
    <div class="main-width">
        <h2>Contact Me</h2>
        <div class="contact-content">
            <form id="contact-form" method="POST" action="send_email.php">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn">Send Message</button>
            </form>
            <div class="contact-info">
                <h3>Let's Connect!</h3>
                <p>Feel free to reach out for collaborations, job opportunities, or just a friendly chat.</p>
                <ul>
                    <li><i class="fa-solid fa-envelope"></i> sudiptosarkarjoy@gmail.com</li>
                    <li><i class="fa-solid fa-phone"></i> +8801774024354</li>
                    <li><i class="fa-solid fa-map-marker"></i> Dhaka, Bangladesh</li>
                </ul>
                <div class="social-links">
                    <a href="https://www.facebook.com/sarkar.joy.142" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://www.linkedin.com/in/sudipto-sarkar-256b15227/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/DarkJ0Y" target="_blank"><i class="fa-brands fa-github"></i></a>
                </div>
            </div>
        </div>
    </div>
</section>
    <script type="text/javascript" src="javascript/homePage.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
    <script>
        var typed = new Typed(".input",{
            strings:["Sudipto Sarkar Joy.","Web Developer.","UX/UI Designer.","App Developer.","Problem Solver."],
            typeSpeed:70,
            backSpeed:60,
            loop:true
        });
    </script>
</body>
</html>