# app.py
# A Flask server that accepts an audio file, processes it with a placeholder
# transcription, and then sends the transcript to the Gemini API for analysis.

import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

# --- Integration: Import the Gemini processing logic ---
# This assumes 'process_transcript.py' is in the same directory.
from process_transcript import process_transcript_with_gemini

# --- 1. Initialize the Flask App ---
app = Flask(__name__)

# --- Configuration ---
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'm4a', 'mp4'}

def allowed_file(filename):
    """Checks if the uploaded file has an allowed extension."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# --- 2. Create the API Endpoint ---
@app.route('/api/process-meeting', methods=['POST'])
def process_meeting_endpoint():
    """
    Handles the POST request with the audio file, processes it,
    and returns a structured JSON response from the LLM.
    """
    print("Received a request to /api/process-meeting")

    # --- A. Validate the Request ---
    if 'audio_file' not in request.files:
        print("Error: 'audio_file' not found in request files.")
        return jsonify({
            "error": "NO_FILE_UPLOADED",
            "message": "The 'audio_file' key was not found in the request."
        }), 400

    file = request.files['audio_file']

    if file.filename == '':
        print("Error: No file selected for upload.")
        return jsonify({
            "error": "EMPTY_FILENAME",
            "message": "No file was selected for upload."
        }), 400

    # --- B. Process the File ---
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        print(f"Processing file: {filename}")

        # --- C. Full Integration Logic ---

        # STEP 1: (Kanak's Task) Transcribe the audio file to text.
        # This is where the call to AssemblyAI or another STT API will go.
        # For now, we use a hardcoded sample transcript to test the flow.
        # To-Do: Replace this with the real transcript from the STT API.
        transcript_text = """
        Alright everyone, let's wrap up. Great progress today.
        So for the action items, Kanak, you're going to handle the backend deployment.
        Please get that done by this Wednesday. Noah, can you please finalize the
        UI mockups and send them over? Let's set a deadline for end of day tomorrow for that.
        And Vibhav, I need you to research the new charting library we discussed.
        No strict deadline on that one, just get to it when you can.
        Vibhu, you're on bug-squashing duty for the login page.
        Thanks everyone.
        """
        print("Using placeholder transcript for processing.")

        # STEP 2: (Vibhu's Task) Send the transcript to the Gemini API.
        # We call the imported function to get the structured JSON data.
        if not transcript_text:
            return jsonify({
                "error": "TRANSCRIPTION_FAILED",
                "message": "Failed to get transcript from the audio file."
            }), 500

        processed_data = process_transcript_with_gemini(transcript_text)

        # STEP 3: Return the final JSON response to the frontend.
        if processed_data:
            print("Successfully processed transcript with Gemini. Sending response.")
            # This returns the full JSON object from Gemini as defined in the API contract.
            return jsonify(processed_data), 200
        else:
            print("Error: LLM processing failed.")
            return jsonify({
                "error": "PROCESSING_FAILED",
                "message": "There was an error communicating with the AI services."
            }), 500

    else:
        print(f"Error: File type not allowed. Filename: {file.filename}")
        return jsonify({
            "error": "INVALID_FILE_TYPE",
            "message": f"File type not allowed. Please upload one of: {list(ALLOWED_EXTENSIONS)}"
        }), 400


# --- 3. Run the Server ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
