from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
@app.route("/index.html")
def home():
    return render_template("index.html")
@app.route("/main.html")
def main():
        projects = [
        {
            "title": "Responsive Portfolio",
            "description": "A responsive portfolio website with animations.",
            "image": "/static/images/project1.jpg",
            "link": "https://github.com/kerolosmichelle/portfolio"
        },
        {
            "title": "E-commerce Store",
            "description": "Online store built with Flask and JS.",
            "image": "/static/images/project2.jpg",
            "link": "#"
        },
        {
            "title": "Data Analysis Project",
            "description": "Python data analysis and visualization.",
            "image": "/static/images/project3.jpg",
            "link": "#"
        },
        {
            "title": "Data Analysis Project",
            "description": "Python data analysis and visualization.",
            "image": "/static/images/project3.jpg",
            "link": "#"
        },
        {
            "title": "Data Analysis Project",
            "description": "Python data analysis and visualization.",
            "image": "/static/images/project3.jpg",
            "link": "#"
        },
        {
            "title": "Data Analysis Project",
            "description": "Python data analysis and visualization.",
            "image": "/static/images/project3.jpg",
            "link": "#"
        },
        {
            "title": "Data Analysis Project",
            "description": "Python data analysis and visualization.",
            "image": "/static/images/project3.jpg",
            "link": "#"
        }
    ]

        return render_template("main.html", projects=projects)

if __name__ == "__main__":
    app.run(debug=True)
