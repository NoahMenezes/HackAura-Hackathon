# process_transcript.py
# Standalone script to process a meeting transcript using the Gemini API
# and force a structured JSON output.

import os
import json
import google.generativeai as genai
from datetime import date

# --- Task 1: LLM API Integration ---
# IMPORTANT: Set your API key as an environment variable before running.
# In your terminal: export GOOGLE_API_KEY="YOUR_API_KEY_HERE"
try:
    # Configure the client with your API key
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
except (AttributeError, KeyError):
    print("="*80)
    print("ERROR: API Key not found.")
    print("Please set the GOOGLE_API_KEY environment variable before running the script.")
    print("For example, in your terminal: export GOOGLE_API_KEY='your_api_key'")
    print("="*80)
    exit()


# --- Task 2: Craft the "Magic" Prompt ---
# This function constructs the detailed prompt that guides the AI.
def create_magic_prompt(transcript_text, meeting_date_str):
    """
    Creates a robust prompt with rules and a one-shot example to guide the LLM.

    Args:
        transcript_text (str): The raw text from the meeting transcript.
        meeting_date_str (str): The date of the meeting in 'YYYY-MM-DD' format.

    Returns:
        str: The fully constructed prompt to be sent to the Gemini API.
    """
    # The robust "one-shot" prompt. It shows the model exactly what we want.
    # This is far more reliable than just telling it the format.
    return f"""
You are an expert AI assistant that functions as a JSON API. Your task is to analyze a meeting transcript and its date, then return a single, valid JSON object conforming to the structure and rules shown in the example below.

### **Rules & Logic**
- You must extract a concise `summary`.
- You must extract all `action_items` with their `task`, `owner`, and `deadline`.
- Deadlines MUST be in **"YYYY-MM-DD"** format. If a date is relative (e.g., "by Friday", "end of next week"), calculate the absolute date based on the provided meeting date.
- If an `owner` or `deadline` for a task is unclear or not mentioned, you MUST use the JSON value `null`.
- You must generate a professional `draft_email` as a single string, using `\\n` for line breaks.
- The `transcript` field must be the complete, original text.
- **CRITICAL:** Your response MUST be a single, valid JSON object and nothing else. Do not wrap it in markdown or add any commentary.

### **Example**

**Meeting Date:** 2025-08-12
**Transcript Input:**
\"\"\"
Okay team, quick sync. Noah, can you get the user feedback report done by Friday? And Vibhav, please deploy the staging server. We need that ASAP. Kanak, check the API logs for errors.
\"\"\"
**JSON Output:**
{{
  "transcript": "Okay team, quick sync. Noah, can you get the user feedback report done by Friday? And Vibhav, please deploy the staging server. We need that ASAP. Kanak, check the API logs for errors.",
  "summary": "This was a quick team sync to assign immediate tasks. Key action items include completing a user feedback report, deploying a server, and checking API logs.",
  "action_items": [
    {{
      "task": "Get the user feedback report done",
      "owner": "Noah",
      "deadline": "2025-08-15"
    }},
    {{
      "task": "Deploy the staging server",
      "owner": "Vibhav",
      "deadline": null
    }},
    {{
      "task": "Check the API logs for errors",
      "owner": "Kanak",
      "deadline": null
    }}
  ],
  "draft_email": "Subject: Quick Sync Follow-Up\\n\\nHi Team,\\n\\nHere are the action items from our meeting:\\n\\n- Noah: Get the user feedback report done by 2025-08-15.\\n- Vibhav: Deploy the staging server.\\n- Kanak: Check the API logs for errors.\\n\\nBest,"
}}

### **Your Task**

**Meeting Date:** {meeting_date_str}
**Transcript Input:**
\"\"\"
{transcript_text}
\"\"\"
**JSON Output:**
"""

def process_transcript_with_gemini(transcript_text):
    """
    Sends the transcript to the Gemini API and gets a structured JSON response.

    Args:
        transcript_text (str): The raw text from the meeting transcript.

    Returns:
        dict: A dictionary containing the processed meeting data, or None if an error occurs.
    """
    model = genai.GenerativeModel('gemini-1.5-flash')
    today = date.today().strftime("%Y-%m-%d")
    prompt = create_magic_prompt(transcript_text, today)
    generation_config = genai.types.GenerationConfig(
        response_mime_type="application/json"
    )

    # *** NEW: Add a timeout to the request to prevent it from hanging forever ***
    request_options = {"timeout": 60}

    try:
        print("Sending request to Gemini API (with a 60-second timeout)...")
        response = model.generate_content(
            prompt,
            generation_config=generation_config,
            request_options=request_options
        )
        print("Received response.")
        return json.loads(response.text)

    except Exception as e:
        print(f"\nAn error occurred: {e}")
        if 'response' in locals() and hasattr(response, 'prompt_feedback'):
            print(f"Prompt Feedback: {response.prompt_feedback}")
        return None

# --- Main execution block to test the script ---
if __name__ == "__main__":
    sample_transcript = """
    Alright everyone, let's wrap up. Great progress today.
    So for the action items, Kanak, you're going to handle the backend deployment.
    Please get that done by this Wednesday. Noah, can you please finalize the
    UI mockups and send them over? Let's set a deadline for end of day tomorrow for that.
    And Vibhav, I need you to research the new charting library we discussed.
    No strict deadline on that one, just get to it when you can.
    Vibhu, you're on bug-squashing duty for the login page.
    Thanks everyone.
    """

    print("--- Processing Sample Transcript ---")
    processed_data = process_transcript_with_gemini(sample_transcript)

    if processed_data:
        print("\n--- Successfully Parsed JSON Output ---")
        print(json.dumps(processed_data, indent=2))
        print("\n--- Script Finished ---")
    else:
        print("\n--- Failed to Process Transcript ---")