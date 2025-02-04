from flask import Flask, request, jsonify
import matplotlib.pyplot as plt
import io
import base64
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

# Apply San Francisco font globally
plt.rcParams['font.family'] = 'SF Pro Display'

# Function to calculate SIP returns
def calculate_sip(monthly_investment, rate, years):
    rate = rate / 100 / 12  # Convert annual rate to monthly rate
    months = years * 12
    total_investment = monthly_investment * months
    future_value = monthly_investment * (((1 + rate) ** months - 1) / rate) * (1 + rate)
    return total_investment, future_value

# Function to calculate Lumpsum returns
def calculate_lumpsum(investment, rate, years):
    rate = rate / 100
    future_value = investment * ((1 + rate) ** years)
    return investment, future_value

# Function to generate a perfectly round pie chart with progress
def generate_pie_chart(invested, returns):
    values = [invested, returns - invested]
    colors = ['#D3D3D3', '#00FF99']  # Light Grey & Apple Green

    fig, ax = plt.subplots(figsize=(6, 6), dpi=200)  # High-res for clarity

    # Draw pie chart (progress ring)
    wedges, texts, autotexts = ax.pie(
        values,
        startangle=90,
        colors=colors,
        autopct='%1.1f%%',
        wedgeprops={'edgecolor': 'white', 'linewidth': 2},
        textprops={'fontsize': 14, 'fontweight': 'bold', 'color': '#333'}
    )

    # Ensure perfect round shape
    ax.set_aspect('equal')

    # Add white circle for donut effect
    center_circle = plt.Circle((0, 0), 0.65, fc='white')
    fig.gca().add_artist(center_circle)

    # Add progress percentage in center
    progress_percentage = (values[1] / sum(values)) * 100
    ax.text(0, 0, f"{progress_percentage:.1f}%", 
            ha='center', va='center', 
            fontsize=22,  
            color='#00FF99')

    plt.title("Investment Growth", fontsize=16,  color='#333')

    # Save as base64
    img = io.BytesIO()
    plt.savefig(img, format='png', bbox_inches="tight", transparent=True)
    plt.close()
    img.seek(0)
    return base64.b64encode(img.getvalue()).decode()

# API Endpoint for Calculation
@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    investment_type = data.get('type')
    investment = float(data.get('investment'))
    rate = float(data.get('rate'))
    years = int(data.get('years'))

    if investment_type == 'sip':
        invested, future_value = calculate_sip(investment, rate, years)
    else:
        invested, future_value = calculate_lumpsum(investment, rate, years)

    chart = generate_pie_chart(invested, future_value)

    return jsonify({
        "invested": round(invested, 2),
        "total_returns": round(future_value, 2),
        "chart": chart
    })

if __name__ == '__main__':
    app.run(debug=True)
