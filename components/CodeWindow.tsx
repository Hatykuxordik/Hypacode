// components/CodeWindow.tsx
"use client";

import { useState, useEffect } from "react";

export default function CodeWindow() {
  const filenames = ["useSpendData.ts", "api/estimate.ts", "motion.config.ts"];
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % filenames.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="code-window">
      <div className="snippet-tabs">
        <div
          className={`snippet-tab ${activeTab === 0 ? "active" : ""}`}
          onClick={() => setActiveTab(0)}
        >
          useSpendData.ts
        </div>
        <div
          className={`snippet-tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          api/estimate.ts
        </div>
        <div
          className={`snippet-tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          motion.config.ts
        </div>
      </div>

      <div className="code-titlebar">
        <div className="code-dots">
          <div className="code-dot" />
          <div className="code-dot" />
          <div className="code-dot" />
        </div>
        <div className="code-filename">
          hypacode / <span>{filenames[activeTab]}</span>
        </div>
      </div>

      <div className="code-body">
        {/* ====================== SNIPPET 0 ====================== */}
        <div className={`snippet-panel ${activeTab === 0 ? "active" : ""}`}>
          <div className="code-line">
            <span className="line-num">1</span>
            <span className="line-content">
              <span className="t-cm">
                // Custom hook — Villeto spend dashboard
              </span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">2</span>
            <span className="line-content">
              <span className="t-kw">export function</span>{" "}
              <span className="t-fn">useSpendData</span>
              <span className="t-op">(</span>
              <span className="t-var">teamId</span>
              <span className="t-op">:</span>{" "}
              <span className="t-type">string</span>
              <span className="t-op">) {"{"}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">3</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-kw">const</span>{" "}
              <span className="t-op">[</span>
              <span className="t-var">data</span>
              <span className="t-op">,</span>{" "}
              <span className="t-var">setData</span>
              <span className="t-op">] =</span>{" "}
              <span className="t-fn">useState</span>
              <span className="t-op">&lt;</span>
              <span className="t-type">SpendSummary</span>
              <span className="t-op"> | </span>
              <span className="t-kw">null</span>
              <span className="t-op">&gt;(</span>
              <span className="t-kw">null</span>
              <span className="t-op">)</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">4</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-kw">const</span>{" "}
              <span className="t-op">{"{"}</span>{" "}
              <span className="t-var">token</span>{" "}
              <span className="t-op">{"}"} =</span>{" "}
              <span className="t-fn">useAuth</span>
              <span className="t-op">()</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">5</span>
            <span className="line-content">&nbsp;</span>
          </div>
          <div className="code-line">
            <span className="line-num">6</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-fn">useEffect</span>
              <span className="t-op">(() =&gt; {"{"}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">7</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-kw">const</span>{" "}
              <span className="t-var">controller</span>{" "}
              <span className="t-op">=</span> <span className="t-kw">new</span>{" "}
              <span className="t-fn">AbortController</span>
              <span className="t-op">()</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">8</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-fn">fetchSpend</span>
              <span className="t-op">(</span>
              <span className="t-op">{"{"}</span>{" "}
              <span className="t-var">teamId</span>
              <span className="t-op">,</span>{" "}
              <span className="t-var">token</span>
              <span className="t-op">,</span>{" "}
              <span className="t-var">signal</span>
              <span className="t-op">:</span>{" "}
              <span className="t-var">controller</span>
              <span className="t-op">.</span>
              <span className="t-var">signal</span>{" "}
              <span className="t-op">{"}"}</span>
              <span className="t-op">)</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">9</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="t-op">.</span>
              <span className="t-fn">then</span>
              <span className="t-op">(</span>
              <span className="t-var">setData</span>
              <span className="t-op">).</span>
              <span className="t-fn">catch</span>
              <span className="t-op">(</span>
              <span className="t-fn">handleError</span>
              <span className="t-op">)</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">10</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-kw">return</span>{" "}
              <span className="t-op">() =&gt;</span>{" "}
              <span className="t-var">controller</span>
              <span className="t-op">.</span>
              <span className="t-fn">abort</span>
              <span className="t-op">()</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">11</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-op">{"}"}, [</span>
              <span className="t-var">teamId</span>
              <span className="t-op">,</span>{" "}
              <span className="t-var">token</span>
              <span className="t-op">])</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">12</span>
            <span className="line-content">&nbsp;</span>
          </div>
          <div className="code-line">
            <span className="line-num">13</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-kw">return</span>{" "}
              <span className="t-op">{"{"}</span>{" "}
              <span className="t-var">data</span>
              <span className="t-op">,</span>{" "}
              <span className="t-var">isLoaded</span>
              <span className="t-op">:</span>{" "}
              <span className="t-var">data</span>{" "}
              <span className="t-op">!==</span>{" "}
              <span className="t-kw">null</span>{" "}
              <span className="t-op">{"}"}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">14</span>
            <span className="line-content">
              <span className="t-op">{"}"}</span>
            </span>
          </div>
        </div>

        {/* ====================== SNIPPET 1 ====================== */}
        <div className={`snippet-panel ${activeTab === 1 ? "active" : ""}`}>
          <div className="code-line">
            <span className="line-num">1</span>
            <span className="line-content">
              <span className="t-cm">
                // Next.js API route — quote estimate
              </span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">2</span>
            <span className="line-content">
              <span className="t-kw">export async function</span>{" "}
              <span className="t-fn">POST</span>
              <span className="t-op">(</span>
              <span className="t-var">req</span>
              <span className="t-op">:</span>{" "}
              <span className="t-type">Request</span>
              <span className="t-op">) {"{"}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">3</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-kw">const</span>{" "}
              <span className="t-var">body</span>{" "}
              <span className="t-op">=</span>{" "}
              <span className="t-kw">await</span>{" "}
              <span className="t-var">req</span>
              <span className="t-op">.</span>
              <span className="t-fn">json</span>
              <span className="t-op">()</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">4</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-kw">const</span>{" "}
              <span className="t-var">pdf</span> <span className="t-op">=</span>{" "}
              <span className="t-kw">await</span>{" "}
              <span className="t-fn">generateQuotePDF</span>
              <span className="t-op">(</span>
              <span className="t-var">body</span>
              <span className="t-op">)</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">5</span>
            <span className="line-content">&nbsp;</span>
          </div>
          <div className="code-line">
            <span className="line-num">6</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-kw">await</span>{" "}
              <span className="t-fn">resend</span>
              <span className="t-op">.</span>
              <span className="t-var">emails</span>
              <span className="t-op">.</span>
              <span className="t-fn">send</span>
              <span className="t-op">(</span>
              <span className="t-op">{"{"}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">7</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-var">from</span>
              <span className="t-op">:</span>{" "}
              <span className="t-str">'[email&#160;protected]'</span>
              <span className="t-op">,</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">8</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-var">to</span>
              <span className="t-op">:</span>{" "}
              <span className="t-var">body</span>
              <span className="t-op">.</span>
              <span className="t-var">email</span>
              <span className="t-op">,</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">9</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-var">attachments</span>
              <span className="t-op">: [</span>
              <span className="t-op">{"{"}</span>{" "}
              <span className="t-var">filename</span>
              <span className="t-op">:</span>{" "}
              <span className="t-str">'quote.pdf'</span>
              <span className="t-op">,</span>{" "}
              <span className="t-var">content</span>
              <span className="t-op">:</span> <span className="t-var">pdf</span>{" "}
              <span className="t-op">{"}"}</span>
              <span className="t-op">]</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">10</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-op">{"}"})</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">11</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-kw">return</span>{" "}
              <span className="t-fn">Response</span>
              <span className="t-op">.</span>
              <span className="t-fn">json</span>
              <span className="t-op">(</span>
              <span className="t-op">{"{"}</span>{" "}
              <span className="t-var">ok</span>
              <span className="t-op">:</span> <span className="t-kw">true</span>{" "}
              <span className="t-op">{"}"}</span>
              <span className="t-op">)</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">12</span>
            <span className="line-content">
              <span className="t-op">{"}"}</span>
            </span>
          </div>
        </div>

        {/* ====================== SNIPPET 2 ====================== */}
        <div className={`snippet-panel ${activeTab === 2 ? "active" : ""}`}>
          <div className="code-line">
            <span className="line-num">1</span>
            <span className="line-content">
              <span className="t-cm">// Hypacode motion tokens</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">2</span>
            <span className="line-content">
              <span className="t-kw">export const</span>{" "}
              <span className="t-acc">ease</span>{" "}
              <span className="t-op">=</span>{" "}
              <span className="t-op">{"{"}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">3</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-var">entrance</span>
              <span className="t-op">: [</span>
              <span className="t-num">0.16</span>
              <span className="t-op">,</span> <span className="t-num">1</span>
              <span className="t-op">,</span> <span className="t-num">0.3</span>
              <span className="t-op">,</span> <span className="t-num">1</span>
              <span className="t-op">],</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">4</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-var">spring</span>
              <span className="t-op">: {"{"}</span>{" "}
              <span className="t-var">type</span>
              <span className="t-op">:</span>{" "}
              <span className="t-str">'spring'</span>
              <span className="t-op">,</span>{" "}
              <span className="t-var">stiffness</span>
              <span className="t-op">:</span> <span className="t-num">400</span>
              <span className="t-op">,</span>{" "}
              <span className="t-var">damping</span>
              <span className="t-op">:</span> <span className="t-num">30</span>{" "}
              <span className="t-op">{"}"},</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">5</span>
            <span className="line-content">
              <span className="t-op">{"}"}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">6</span>
            <span className="line-content">
              <span className="t-kw">export const</span>{" "}
              <span className="t-acc">duration</span>{" "}
              <span className="t-op">=</span>{" "}
              <span className="t-op">{"{"}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">7</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-var">xs</span>
              <span className="t-op">:</span> <span className="t-num">0.1</span>
              <span className="t-op">,</span> <span className="t-var">sm</span>
              <span className="t-op">:</span> <span className="t-num">0.2</span>
              <span className="t-op">,</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">8</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-var">md</span>
              <span className="t-op">:</span> <span className="t-num">0.4</span>
              <span className="t-op">,</span> <span className="t-var">lg</span>
              <span className="t-op">:</span> <span className="t-num">0.6</span>
              <span className="t-op">,</span> <span className="t-var">xl</span>
              <span className="t-op">:</span> <span className="t-num">0.7</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">9</span>
            <span className="line-content">
              <span className="t-op">{"}"}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">10</span>
            <span className="line-content">
              <span className="t-kw">export const</span>{" "}
              <span className="t-acc">stagger</span>{" "}
              <span className="t-op">=</span>{" "}
              <span className="t-op">{"{"}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">11</span>
            <span className="line-content">
              &nbsp;&nbsp;<span className="t-var">children</span>
              <span className="t-op">:</span>{" "}
              <span className="t-num">0.07</span>
              <span className="t-op">,</span>{" "}
              <span className="t-var">fast</span>
              <span className="t-op">:</span>{" "}
              <span className="t-num">0.04</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-num">12</span>
            <span className="line-content">
              <span className="t-op">{"}"}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
