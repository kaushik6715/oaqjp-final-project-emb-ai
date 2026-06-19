# Final Project: Emotion Detection Application using Watson NLP

## Project Description
This is the **Final Project** for the application development course. It features a complete, end-to-end web-based application that analyzes the emotional tone of user-provided text. The application leverages the **IBM Watson NLP Emotion Detection service** via an API, processes the raw data into structured insights using **Python**, validates edge cases with robust **Unit Testing**, and deploys the final interface as a web application utilizing the **Flask** framework.

---

## Features & Implementation Details

* **Watson NLP Integration:** Communicates with the pre-deployed Watson Emotion Detection service to evaluate text for five core emotions: anger, disgust, fear, joy, and sadness.
* **Data Formatting Logic:** Processes raw, nested API responses to extract individual scores and dynamically isolates the `dominant_emotion` with Python's logic.
* **Error and Blank Input Handling:** Implements resilient error handling to gracefully capture empty submissions and API HTTP 400 errors, returning clear, user-friendly warnings instead of application failures.
* **Unit Tested:** Validates functional reliability using Python's built-in `unittest` library across varying test cases.
* **Static Code Analysis:** Structured cleanly according to PEP 8 standards, achieving a perfect `10.00/10` linter rating via `pylint`.

---

## Project Structure

```text
oaqjp-final-project-emb-ai/
│
├── EmotionDetection/          # Core application package
│   ├── __init__.py            # Initializer making the directory an importable package
│   └── emotion_detection.py   # Handles Watson API calls and response formatting
│
├── templates/                 # Web UI templates
│   └── index.html             # User interface frontend layout
│
├── server.py                  # Flask web deployment server with error handling
├── test_emotion_detection.py  # Automated unit testing suite
└── README.md                  # Project documentation
